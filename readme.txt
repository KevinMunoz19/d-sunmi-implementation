Use nodejs v 8.17.0

Clear the cache
  npx react-native start --reset-cache

Bundle the App
  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Run app
  npx react-native run-android


Insert code into buil.gradle
android{
    defaultConfig {

        // Enabling multidex support.
        multiDexEnabled true
    }


    dexOptions {
        javaMaxHeapSize "4g"
    }
}
dependencies {
    //...
    compile 'com.android.support:multidex:1.0.0'
}
