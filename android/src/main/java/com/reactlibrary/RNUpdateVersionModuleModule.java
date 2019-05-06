
package com.reactlibrary;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


import com.azhon.appupdate.config.UpdateConfiguration;
import com.azhon.appupdate.listener.OnDownloadListener;
import com.azhon.appupdate.manager.DownloadManager;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;


public class RNUpdateVersionModuleModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNUpdateVersionModuleModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNUpdateVersionModule";
  }


  @ReactMethod
  public void update(String url) {
    if (url.length() < 5) { return; } // 简单判断

    DownloadManager manager = DownloadManager.getInstance(getCurrentActivity());
    // 下载配置
    UpdateConfiguration configuration = new UpdateConfiguration();
    configuration.setOnDownloadListener(new OnDownloadListener() {
      @Override
      public void start() {

      }

      @Override
      public void downloading(int max, int progress) {
        WritableMap params = Arguments.createMap();
        params.putInt("total", max);
        params.putInt("current", progress);

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("DownloadApkProgress", params);
      }

      @Override
      public void done(File apk) {
        WritableMap params = Arguments.createMap();
        params.putInt("total", 100);
        params.putInt("current", 100);
        params.putBoolean("done", true);

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("DownloadApkProgress", params);
      }

      @Override
      public void cancel() {

      }

      @Override
      public void error(Exception e) {
        WritableMap params = Arguments.createMap();
        params.putInt("total", 0);
        params.putInt("current", 0);
        params.putBoolean("error", true);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("DownloadApkProgress", params);
      }
    });

    manager.setApkName("wingshop.apk")
            .setApkUrl(url)
          //.setSmallIcon(R.mipmap.ic_launcher)
            .setConfiguration(configuration)
            .download();
  }
}