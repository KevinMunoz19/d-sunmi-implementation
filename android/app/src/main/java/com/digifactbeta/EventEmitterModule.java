package com.digifactbeta;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;


public class EventEmitterModule extends ReactContextBaseJavaModule{


    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    EventEmitterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Nonnull
    @Override
    public String getName() {
        return "EventEmitter";
    }

    @SuppressWarnings("ConstantConditions")
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MyEventName", "MyEventValue");
        return constants;
    }

    static void emitEvent(@NonNull String message) {
        eventEmitter.emit("MyEventValue", message);
    }

}
