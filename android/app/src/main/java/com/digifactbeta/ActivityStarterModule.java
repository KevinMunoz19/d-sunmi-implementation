package com.digifactbeta;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;

import javax.annotation.Nonnull;

public class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    //void navigateToExample(@NonNull String datafactura) {
    void navigateToExample(@NonNull String datafactura,@NonNull String datausuario,@NonNull String dataitems) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(activity, ExampleActivity.class);
            intent.setAction(Intent.ACTION_SEND);
            //intent.putExtra(Intent.EXTRA_TEXT, datafactura);
            intent.putExtra("jsondatadocumento", datafactura);
            intent.putExtra("jsondatausuario", datausuario);
            intent.putExtra("jsondataitems", dataitems);
            intent.setType("text/plain");
            activity.startActivity(intent);

            activity.startActivity(intent);
        }
    }
    //@ReactMethod
    //void dialNumber(@NonNull String number) {
    //    Activity activity = getCurrentActivity();
    //    if (activity != null) {
    //        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
    //        activity.startActivity(intent);
    //    }
    //}



}
