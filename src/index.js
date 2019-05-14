import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import VersionNumber from 'react-native-version-number';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './styles';

const { RNUpdateVersionModule } = NativeModules;

// 获取版本信息
const currentVersion = VersionNumber.buildVersion; // 版本号
const currentVersionCode = VersionNumber.appVersion; // 版本名称

const bg = require('./images/pic.png');
const closeIcon = require('./images/ic-close.png');

/**
 *  判断版本号格式是否正确
 */
const isOkVersionCode = code => {
  const reg = /^(\d{1,4}\.)+\d{1,4}$/;
  return reg.test(`${code}`);
};

/**
 * 检查ios appStore 是否有新版本
 */
const isAppStoreHasNewVersion = async appId => {
  if (Platform.OS === 'ios') {
    await axios(`https://itunes.apple.com/cn/lookup?id=${appId}`).then(({ results }) => {
      if (Array.isArray(results) && results.length) {
        const { version } = results[0];
        // 判断版本格式是否正确
        if (isOkVersionCode(version) && isOkVersionCode(currentVersionCode)) {
          if (version > currentVersionCode) {
            return true;
          }
        }
      }
      return false;
    });
  }
  return false;
};

class UpdateVersion extends PureComponent {
  static propTypes = {
    version: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 内部版本号 12
    versionCode: PropTypes.string, // 外部版本号 'v1.0.0'
    updateInfo: PropTypes.string, // 升级信息 '1、支持第三方平台业务|2、展示第三方平台订单取单编码'
    promote: PropTypes.number, // 更新方式(1升级，0不升级，2强制升级)
    clientUrl: PropTypes.string, // 下载地址
    appId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired // appId
  };

  static defaultProps = {
    version: 1,
    versionCode: 'v1.0.0',
    updateInfo: '1、支持第三方平台业务|2、展示第三方平台订单取单编码',
    promote: 1,
    clientUrl: ''
  };

  state = {
    status: 'unDownloading', // 状态 'unDownloading' 没在下载中 'downloading'下载中'
    isVisible: true, // 是否显示modal
    title: '升级到新版本',
    btnText: '立即升级' // 按钮上的信息
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { version, promote, appId } = nextProps;
    const { isVisible } = preState;
    if (currentVersion < version && promote !== 0 && isAppStoreHasNewVersion(appId) && !isVisible) {
      return {
        isVisible: true
      };
    }

    return null;
  }

  componentWillUnmount() {
    // 回收监听进度
    DeviceEventEmitter.removeListener('DownloadApkProgress');
  }

  /**
   * 判断是否需要更新以及更新方式
   */
  checkUpdate = () => {
    const { version, promote } = this.props;
    if (currentVersion < version && promote !== 0 && this.isAppStoreHasNewVersion()) {
      this.setState({
        isVisible: true
      });
    }
  };

  /**
   * 安卓ios
   */
  updateIOS = () => {
    const { appId } = this.props;
    RNUpdateVersionModule.update(`${appId}`);
  };

  /**
   * 安卓升级
   */
  updateAndroid = () => {
    const { clientUrl } = this.props;
    RNUpdateVersionModule.update(clientUrl);
    DeviceEventEmitter.addListener('DownloadApkProgress', arg => {
      const { percent, error, done } = arg;
      this.setState({
        status: 'downloading',
        title: '升级中...',
        btnText: `${percent}%...`
      });
      if (error) {
        this.setState({
          status: 'unDownloading',
          title: '下载失败',
          btnText: '重新下载'
        });
      }
      if (done) {
        this.setState({
          status: 'unDownloading',
          title: '升级成功',
          btnText: '重新升级'
        });
      }
    });
  };

  /**
   * 点击升级
   */
  update = () => {
    const { status } = this.state;
    if (status !== 'downloading') {
      if (Platform.OS === 'ios') {
        this.updateIOS();
      } else {
        this.updateAndroid();
      }
    }
  };

  /**
   * 隐藏modal
   */
  hideModal = () => {
    this.setState({
      isVisible: false
    });
  };

  /**
   * 按下背景时调用
   */
  onBackdropPress = () => {
    const { promote } = this.props;
    if (promote !== 2) {
      // 不强制升级时可以关闭modal
      this.hideModal();
    }
  };

  render() {
    const { versionCode, updateInfo, promote } = this.props;
    const { title, btnText, isVisible } = this.state;
    const updateDetail = updateInfo.split('|').map((item, index) => (
      <Text style={styles.txt} key={String(index)}>
        {item}
      </Text>
    ));
    return (
      <Modal isVisible={isVisible} backdropOpacity={0.5} onBackdropPress={this.onBackdropPress}>
        <View style={styles.container}>
          <Image source={bg} style={styles.bg} />
          <View style={styles.content}>
            <View style={styles.seperate} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.version}>{versionCode}</Text>
            <ScrollView style={styles.inner}>{updateDetail}</ScrollView>
            <View style={styles.divider} />
            <TouchableOpacity onPress={this.update}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>{btnText}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {promote === 1 ? (
            <TouchableOpacity style={styles.close} onPress={this.hideModal}>
              <View justify='center' align='center' style={styles.closeInner}>
                <Image source={closeIcon} style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </Modal>
    );
  }
}

export default UpdateVersion;
