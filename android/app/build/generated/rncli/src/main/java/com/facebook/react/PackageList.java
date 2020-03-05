
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.digifactbeta.BuildConfig;
import com.digifactbeta.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// react-native-document-picker
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-pdf
import org.wonday.pdf.RCTPdfView;
// react-native-sqlite-storage
import org.pgsqlite.SQLitePluginPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new AsyncStoragePackage(),
      new DocumentPickerPackage(),
      new ImagePickerPackage(),
      new RCTPdfView(),
      new SQLitePluginPackage(),
      new VectorIconsPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
