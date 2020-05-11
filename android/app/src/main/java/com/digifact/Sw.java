package com.digifact;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;

import android.view.View;


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