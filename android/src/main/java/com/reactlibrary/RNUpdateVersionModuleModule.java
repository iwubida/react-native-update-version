
package com.reactlibrary;

import android.util.Log;

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
import com.reactlibrary.R;


public class RNUpdateVersionModuleModule extends ReactContextBaseJavaModule {

  // 上次进度
  static int lastPercent = 0;

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
    configuration.setShowBgdToast(false);
    configuration.setOnDownloadListener(new OnDownloadListener() {
      @Override
      public void start() {
        Log.i("UPDATEVERSION", "start");
      }

      @Override
      public void downloading(int max, int progress) {
        WritableMap params = Arguments.createMap();
        params.putInt("total", max);
        params.putInt("current", progress);

        int percent = (int)(progress * 1.0 / max * 100);
        params.putInt("percent", percent);

        // 限制消息发送
        if (lastPercent != percent) {
          reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("DownloadApkProgress", params);
        }
        lastPercent = percent;
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

    manager.setApkName("update.apk")
            .setApkUrl(url)
            .setSmallIcon(R.mipmap.ic_update)
            .setConfiguration(configuration)
            .download();
  }
}