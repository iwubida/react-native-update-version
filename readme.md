# react-native-update-version-module

## Getting started

`$ npm install react-native-update-version-module --save`

### Mostly automatic installation

`$ react-native link react-native-update-version-module`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-update-version-module` and add `RNUpdateVersionModule.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNUpdateVersionModule.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

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

## Usage

```javascript
import RNUpdateVersionModule from 'react-native-update-version-module'
```

1. iOS

```javascript
// Go to appStroe
RNUpdateVersionModule.update(`${appId}`)
```

2. Android

```javascript
// Download apk
RNUpdateVersionModule.update(`${apkUrl}`)
// Download Progress
DeviceEventEmitter.addListener('DownloadApkProgress', arg => {
  if (arg.error) {
    console.log('下载失败')
  } else if (arg.done) {
    console.log('升级成功')
  } else {
    const percent = Math.floor((arg.current / arg.total) * 100) || 0
    console.log(`${percent}%`)
  }
})

componentWillUnmount() {
  // RemoveListener
	DeviceEventEmitter.removeListener('DownloadApkProgress');
}
```
