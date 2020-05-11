package com.digifact;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.CallSuper;
import androidx.annotation.Nullable;

//import woyou.aidlservice.jiuiv5.ICallback;

//import woyou.aidlservice.jiuiv5.*;






import org.json.JSONException;
import org.json.JSONObject;

public class ExampleActivity extends ReactActivity {


    private EditText prueba;
    private EditText autorizacion;




    @Override
    @CallSuper
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);





        setContentView(R.layout.activity_example);

        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type))
            {
                handleSendText(intent); // Handle text being sent
            }
        }

        // Display app and React Native versions:
        //this.<TextView>findViewById(R.id.app_version).setText(BuildConfig.VERSION_NAME);
        //this.<TextView>findViewById(R.id.react_native_version).setText(BuildConfig.REACT_NATIVE_VERSION);

        findViewById(R.id.go_back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();

                Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.digifactbeta");
                if (launchIntent != null) {
                    startActivity(launchIntent);
                } else {
                    Toast.makeText(ExampleActivity.this, "There is no package available in android", Toast.LENGTH_LONG).show();
                }


            }
        });

        findViewById(R.id.impresionBtn).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                imprimirDocumento();
            }
        });

        findViewById(R.id.sendEventBtn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EventEmitterModule.emitEvent("Message From Java");
            }
        });

    }

    public void imprimirDocumento(){

    }










    void handleSendText(Intent intent) {
        String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (sharedText != null) {
            prueba = findViewById(R.id.editText);
            prueba.setText(sharedText);
            autorizacion = findViewById(R.id.editTextAuth);
            // Update UI to reflect text being shared
            String jsonstring = sharedText.replace("[","");
            String newjsonstring = jsonstring.replace("]","");
            try {
                JSONObject newobject = new JSONObject(newjsonstring);
                String authnumber = newobject.getString("auth_number");
                autorizacion.setText(authnumber);
            }
            catch (JSONException err){
                Log.d("Error", err.toString());
                autorizacion.setText("Bye");
            }
        }
    }

}
