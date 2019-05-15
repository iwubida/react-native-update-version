# @iwubida/react-native-update-version

##### 支持App版本自动升级提醒和升级，提供可选的升级页面组件，同时支持Android和IOS。

[![npm version](https://img.shields.io/npm/v/@iwubida/react-native-update-version.svg?style=flat)](https://www.npmjs.com/package/@iwubida/react-native-update-version)

## 例子：传入最新的`内部版本号`和`外部版本号`后该插件可以自动检测出该App是否需要弹出更新提示。

- 可以选择使用该插件自带的样式组件(支持Android和IOS)

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

- IOS点击`立即升级`后，跳转App Store

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
react-native link @iwubida/react-native-update-version
```

手动配置

##### ios

  1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
  2. Go to `node_modules` ➜ `react-native-update-version-module` and add `RNUpdateVersionModule.xcodeproj`
  3. In XCode, in the project navigator, select your project. Add `libRNUpdateVersionModule.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
  4. Run your project (`Cmd+R`)<

##### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.reactlibrary.RNUpdateVersionModulePackage;` to the imports at the top of the file
- Add `new RNUpdateVersionModulePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-update-version-module'
   project(':react-native-update-version-module').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-update-version-module/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':react-native-update-version-module')
   ```

## 使用

#### 不使用升级页面组件

```javascript
import { NativeModules } from 'react-native';
const { RNUpdateVersionModule } = NativeModules;
```

iOS

```javascript
// Go to appStroe
RNUpdateVersionModule.update(`${appId}`);
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
