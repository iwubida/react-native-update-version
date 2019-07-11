# @iwubida/react-native-update-version

##### 支持App版本自动升级提醒和升级，提供可选的升级页面组件，同时支持Android和iOS。

[![npm version](https://img.shields.io/npm/v/@iwubida/react-native-update-version.svg?style=flat)](https://www.npmjs.com/package/@iwubida/react-native-update-version)

## 例子：传入最新的`内部版本号`和`外部版本号`后该插件可以自动检测出该App是否需要弹出更新提示。

- 可以选择使用该插件自带的样式组件(支持Android和iOS)

<p float="left">

<img src="/images/android-shouye.jpg" height="400px">

<img src="/images/ios.png" height="400px">

</p>

- Android点击`立即升级`后，开始下载过程

<p float="left">

<img src="/images/android-downlonging.jpg" height="400px">

<img src="/images/android-queren.jpg" height="400px">

<img src="/images/android-guocheng.jpg" height="400px">

</p>

- iOS点击`立即升级`后，跳转App Store

<img src="/images/ios-downloading.png" height="400px">


## 安装

yarn

```shell
yarn add @iwubida/react-native-update-version
```

npm install

```shell
npm install @iwubida/react-native-update-version --save
```

## 项目配置

自动配置`(推荐)`

```shell
react-native link react-native-version-number
react-native link @iwubida/react-native-update-version
```

## 使用

#### 使用提供的升级页面组件

```javascript
import UpdateVersion from '@iwubida/react-native-update-version';

const Demo = ({appleId, version, versionCode, promote, clientUrl, updateInfo}) => (
  <UpdateVersion
    appleId={appleId}
    version={version}
    versionCode={versionCode}
    promote={promote}
    clientUrl={clientUrl}
    updateInfo={updateInfo}
  />
);
```

参数支持说明

| Name | Type | Default | Description |
| :-: | :-: | :-: | :-: |
| version | string | 1 | 最新的内部版本号 |
| versionCode | string | 'v1.0.0' | 最新的外部版本号 |
| updateInfo | string | '' | 升级内容信息 '1、支持第三方平台业务\|2、展示第三方平台订单取单编码' |
| promote | number | 0 | 更新方式(1升级，0不升级，2强制升级) |
| clientUrl | string | '' | 安卓下载地址 |
| appleId | string | '' | 必填 appleId |

#### 不使用提供的升级页面组件，要自己写页面组件的，👇下面方法可提供下载过程。

```javascript
import { NativeModules } from 'react-native';
const { RNUpdateVersionModule } = NativeModules;
```

iOS

```javascript
// Go to appStore
RNUpdateVersionModule.update(`${appleId}`);
```

Android

```javascript
// Download apk
RNUpdateVersionModule.update(`${apkUrl}`);
// Download Progress
DeviceEventEmitter.addListener('DownloadApkProgress', arg => {
  if (arg.error) {
    console.log('下载失败');
  } else if (arg.done) {
    console.log('升级成功');
  } else {
    const {percent} = arg;
    console.log(`${percent}%`);
  }
})

componentWillUnmount() {
  // RemoveListener
  DeviceEventEmitter.removeListener('DownloadApkProgress');
}
```
