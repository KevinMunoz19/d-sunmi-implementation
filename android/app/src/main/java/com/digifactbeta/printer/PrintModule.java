package com.digifactbeta.printer;



import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;
import android.widget.Toast;

//import com.digifact.printer.model.Cupon;
//import com.digifact.printer.model.EncabezadoItem;
//import com.digifact.printer.model.FooterItem;
//import com.digifact.printer.model.Imprimir;
//import com.digifact.printer.model.LineasItem;
//import com.digifact.printer.model.TotalItem;
import com.digifactbeta.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import java.util.ArrayList;
import java.util.Iterator;

import woyou.aidlservice.jiuiv5.ICallback;
import woyou.aidlservice.jiuiv5.IWoyouService;



public class PrintModule extends ReactContextBaseJavaModule{


    private static final byte ESC = 0x1B;// Escape
    private static final byte GS = 0x1D;// Group separator
    private static final String TAG = "print_module";
    private IWoyouService woyouService;

    private int[] darkness = new int[]{3, 0x0500, 0x0400, 0x0300, 0x0200, 0x0100, 0,
            0xffff, 0xfeff, 0xfdff, 0xfcff, 0xfbff, 0xfaff};

    private int[] width;
    private int[] align;



    PrintModule(ReactApplicationContext reactContext) {

        super(reactContext);

        Intent intent = new Intent();
        intent.setPackage("woyou.aidlservice.jiuiv5");
        intent.setAction("woyou.aidlservice.jiuiv5.IWoyouService");
        reactContext.startService(intent);//启动打印服务
        reactContext.bindService(intent, connService, Context.BIND_AUTO_CREATE);
    }


    private ServiceConnection connService = new ServiceConnection() {

        @Override
        public void onServiceDisconnected(ComponentName name) {
            woyouService = null;
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            woyouService = IWoyouService.Stub.asInterface(service);
        }
    };

    private ICallback callback = new ICallback.Stub() {

        @Override
        public void onRunResult(boolean success) {
            //NOT USE
        }

        @Override
        public void onReturnString(final String value) {
            //NOT USE
        }

        @Override
        public void onRaiseException(int code, final String msg) {
            //NOT USE
        }

        @Override
        public void onPrintResult(int code, String msg) {
            //NOT USE
        }

    };


    @Override
    public String getName() {
        return "PrintModule";
    }




    @ReactMethod
    //public void print(String response) {
    public void print(String response, String usuario, String items) {

        Bitmap logo = BitmapFactory.decodeResource(getReactApplicationContext().getResources(),R.drawable.qrcode);
        if (woyouService != null) {
            width = new int[]{22, 32, 19, 27};
            align = new int[]{0, 0, 0, 2};


            try {
                woyouService.setFontSize(20, null);
                // Eliminate brackets from sql json response
                String jsonstring = response.replace("[","").replace("]","");
                String jsonstringusuario = usuario.replace("[","").replace("]","");
                String jsonstringitems = items.replace("[","").replace("]","");
                //String newstr = items.replaceAll("[{}]","").replace("[","").replace("]","");
                //String [] array = jsonstringitems.split("},{");

                String[] strs = jsonstringitems.split("(?<=\\},)(?=\\{)");



                //String newstrjson = "{"+newstr+"}";
                //String newstrjsonformat = newstrjson.replace("[","").replace("]","");




                try {
                    // Json Object from Json string obtained from react
                    JSONObject newobject = new JSONObject(jsonstring);
                    JSONObject newobjectusuario = new JSONObject(jsonstringusuario);
                    JSONObject newobjectitems = new JSONObject(jsonstringitems);



                    // String vars to store data from json object related to document emitter
                    String nombreComercio = newobjectusuario.getString("name");
                    String nitComercio = newobjectusuario.getString("nit");
                    String telefonoComercio = newobjectusuario.getString("phone");
                    String direccionComercio = "5ta avenida zona 1";
                    String tipoDocumentoTributario = "Documento Tributario Electronico";
                    String strFactura = "Factura";
                    // String vars to store data from json object relate to document
                    String numeroAutorizacion = newobject.getString("auth_number");
                    String numeroDocumento = newobject.getString("number");
                    String numeroSerie = newobject.getString("serie");
                    String numeroTotal = newobject.getString("amount");
                    String fechaEmision = newobject.getString("date");
                    String nitCliente = newobject.getString("receiver_nit");
                    //String statusDocumento = newobject.getString("status");
                    String nombreCliente = newobject.getString("receiver_name");
                    // String vars to store data from json object related to items
                    //String nombreItems = newobjectitems.getString("price");
                    // String vars to store data from json object related to certifier
                    String nombreCertificador = "Cyber Espacio";
                    String nombreCertificador2 = "Sociedad Anonima";
                    String nitCertificador = "465513249";
                    String direccionCertificador = "Edificio Paladium";

                    //woyouService.printBitmap(logo,null);
                    woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);

                    woyouService.sendRAWData(boldOff(), null);
                    woyouService.printColumnsString(new String[]{" ",nombreComercio , " ", " "},new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",direccionComercio , "", ""}, new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","NIT: "+nitComercio, "", ""}, new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Telefono: "+telefonoComercio, "", ""}, new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",tipoDocumentoTributario , "", ""}, new int[]{25, 56, 14, 5}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",strFactura , "", ""}, new int[]{20, 65, 5, 15}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Serie: "+numeroSerie , "", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Numero: "+numeroDocumento , "", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","No. Autorizacion:","", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",numeroAutorizacion , "", ""}, new int[]{20, 60, 10, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Fecha Emision: ", "", ""}, new int[]{20, 60, 10, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",fechaEmision , "", ""}, new int[]{20, 60, 10, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    woyouService.printColumnsString(new String[]{"","Nombre: "+nombreCliente , "", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","NIT: "+nitCliente , "", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Total Compra: Q"+numeroTotal , "", ""}, new int[]{20, 50, 20, 10}, new int[]{0, 0, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    woyouService.printColumnsString(new String[]{" ","Datos Certificador" , " ", " "},new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{" ",nombreCertificador , " ", " "},new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{" ",nombreCertificador2 , " ", " "},new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{" ","NIT: "+nitCertificador , " ", " "},new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"",direccionCertificador , "", ""}, new int[]{20, 65, 5, 10}, new int[]{0, 1, 0, 0}, null);
                    woyouService.printColumnsString(new String[]{"","Cantidad" , "Descripcion", "Precio"}, new int[]{5, 32, 43, 20}, new int[]{0, 0, 0, 0}, null);
                    for (int i=0; i < strs.length; i++) {
                        if (strs[i] != null && strs[i].length() > 0 && strs[i].charAt(strs[i].length() - 1) == ',') {
                            strs[i] = strs[i].substring(0,strs[i].length() - 1);
                        }


                        JSONObject item = new JSONObject(strs[i]);
                        String precioItem = item.getString("price");
                        String nombreItem = item.getString("name");
                        String cantidadItem = item.getString("quantity");



                        woyouService.printColumnsString(new String[]{"",cantidadItem , nombreItem, "Q"+precioItem }, new int[]{5, 32, 43, 20}, new int[]{0, 0, 0, 1}, null);
                    }

                    woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    //woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    //woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);
                    //woyouService.printColumnsString(new String[]{" "," " , "", ""}, width, align, null);

                }
                catch (JSONException err){
                    Log.d("Error", err.toString());
                    //autorizacion.setText("Error Obteniendo Datos de Factura");
                }



            } catch (RemoteException e) {
                e.printStackTrace();
            }
        } else {
            Toast.makeText(getReactApplicationContext().getApplicationContext(), "Impresora no conectada.", Toast.LENGTH_SHORT).show();
        }

    }


    private static byte[] boldOn() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 69;
        result[2] = 0xF;
        return result;
    }

    public static byte[] setPrinterDarkness(int value) {
        byte[] result = new byte[9];
        result[0] = GS;
        result[1] = 40;
        result[2] = 69;
        result[3] = 4;
        result[4] = 0;
        result[5] = 5;
        result[6] = 5;
        result[7] = (byte) (value >> 8);
        result[8] = (byte) value;
        return result;
    }

    public static byte[] boldOff() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 69;
        result[2] = 0;
        return result;
    }


}
