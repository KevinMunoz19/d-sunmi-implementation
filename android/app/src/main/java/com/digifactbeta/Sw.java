package com.digifactbeta;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.widget.Button;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import com.kinpos.kpinvocacion.KP_Invocador;
import com.kinpos.kpinvocacion.Trans_Results;
import com.kinpos.printer.A920Printer;
import com.kinpos.printer.ALINEAMIENTO;
import com.kinpos.printer.OperationResult;
import com.kinpos.printer.TAMANIO_LETRA;

import java.util.ArrayList;


public class Sw extends androidx.appcompat.widget.AppCompatButton {


    public Boolean isTurnedOn = false;

    public void setIsTurnedOn (Boolean switchStatus){
        isTurnedOn = switchStatus;
        changeColor();
    }
    public Sw(Context context) {
        super(context);
        this.setTextColor(Color.BLUE);
        this.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                isTurnedOn = !isTurnedOn;
                changeColor();
            }
        });
        changeColor();
    }

    private void changeColor() {
        if (isTurnedOn) {
            setBackgroundColor(Color.YELLOW);
            setText("I am ON");
        } else {
            setBackgroundColor(Color.GRAY);
            setText("I am OFF");
        }
    }

    public Sw(Context context, AttributeSet attrs) {
        super(context, attrs);
    }
    public Sw(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }









}