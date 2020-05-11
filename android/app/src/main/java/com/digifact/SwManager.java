package com.digifact;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


public class SwManager extends SimpleViewManager<Sw> {



    @Override
    public String getName() {
        return "Sw";
    }
    @Override
    protected Sw createViewInstance(ThemedReactContext reactContext) {
        return new Sw(reactContext);
    }
    @ReactProp(name="isTurnedOn")
    public void setSwStatus(Sw switchView, Boolean isTurnedOn) {
        switchView.setIsTurnedOn(isTurnedOn);
    }
}