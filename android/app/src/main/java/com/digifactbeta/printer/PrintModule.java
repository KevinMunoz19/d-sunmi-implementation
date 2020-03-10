package com.digifactbeta.printer;



import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;


import android.content.Context;
import android.util.Log;


//import com.digifact.printer.model.Cupon;
//import com.digifact.printer.model.EncabezadoItem;
//import com.digifact.printer.model.FooterItem;
//import com.digifact.printer.model.Imprimir;
//import com.digifact.printer.model.LineasItem;
//import com.digifact.printer.model.TotalItem;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import woyou.aidlservice.jiuiv5.ICallback;


public class PrintModule extends ReactContextBaseJavaModule{


    private static final byte ESC = 0x1B;// Escape
    private static final byte GS = 0x1D;// Group separator
    private static final String TAG = "print_module";
    //private IWoyouService woyouService;

    private int[] darkness = new int[]{3, 0x0500, 0x0400, 0x0300, 0x0200, 0x0100, 0,
            0xffff, 0xfeff, 0xfdff, 0xfcff, 0xfbff, 0xfaff};

    private int[] width;
    private int[] widthTitles;
    private int[] widthDouble;
    private int[] widthItems;
    private int[] widthSeparation;
    private int[] align;

    private static final UUID PRINTER_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private static final String Innerprinter_Address = "00:11:22:33:44:55";
    public static boolean isBlueToothPrinter = false;
    private static BluetoothSocket bluetoothSocket;
    public static final byte LF =  0x0A;//Print and wrap (horizontal orientation)
    //public static final byte ESC = 0x1B;// Escape



    public static BluetoothAdapter getBTAdapter() {
        return BluetoothAdapter.getDefaultAdapter();
    }

    public static BluetoothDevice getDevice(BluetoothAdapter bluetoothAdapter) {
        BluetoothDevice innerprinter_device = null;
        Set<BluetoothDevice> devices = bluetoothAdapter.getBondedDevices();
        for (BluetoothDevice device : devices) {
            if (device.getAddress().equals(Innerprinter_Address)) {
                innerprinter_device = device;
                break;
            }
        }
        return innerprinter_device;
    }

    public static BluetoothSocket getSocket(BluetoothDevice device) throws IOException {
        BluetoothSocket socket = device.createRfcommSocketToServiceRecord(PRINTER_UUID);
        socket.connect();
        return socket;
    }

    public static boolean connectBlueTooth(Context context) {
        if (bluetoothSocket == null) {
            if (getBTAdapter() == null) {

                return false;
            }
            if (!getBTAdapter().isEnabled()) {

                return false;
            }
            BluetoothDevice device;
            if ((device = getDevice(getBTAdapter())) == null) {

                return false;
            }

            try {
                bluetoothSocket = getSocket(device);
            } catch (IOException e) {

                return false;
            }
        }
        return true;
    }

    public static void sendData(byte[] bytes, BluetoothSocket socket) throws IOException {
        OutputStream out = socket.getOutputStream();
        out.write(bytes, 0, bytes.length);
        //out.close();
    }






    PrintModule(ReactApplicationContext reactContext) {

        super(reactContext);

        Intent intent = new Intent();
        intent.setPackage("woyou.aidlservice.jiuiv5");
        intent.setAction("woyou.aidlservice.jiuiv5.IWoyouService");
        reactContext.startService(intent);//启动打印服务
        //reactContext.bindService(intent, connService, Context.BIND_AUTO_CREATE);
    }


    //private ServiceConnection connService = new ServiceConnection() {

    //    @Override
    //    public void onServiceDisconnected(ComponentName name) {
            //woyouService = null;
    //    }

    //    @Override
    //    public void onServiceConnected(ComponentName name, IBinder service) {
    //        woyouService = IWoyouService.Stub.asInterface(service);
    //    }
    //};

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
        // Eliminate brackets from sql json response
        String jsonstring = response.replace("[","").replace("]","");
        String jsonstringusuario = usuario.replace("[","").replace("]","");
        String jsonstringitems = items.replace("[","").replace("]","");
        String[] strs = jsonstringitems.split("(?<=\\},)(?=\\{)");
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
                    String formatedDocumento = String.format("%10s      %10s  ", "Numero: ", numeroDocumento);
                    String numeroSerie = newobject.getString("serie");
                    String numeroTotal = newobject.getString("amount");
                    String fechaEmision = newobject.getString("date");
                    String strDatosCliente = "Datos Cliente";
                    String nitCliente = newobject.getString("receiver_nit");
                    String nombreCliente = newobject.getString("receiver_name");
                    // String vars to store data from json object related to items
                    String strDetalleVenta = "Detalle Venta";
                    // String vars to store data from json object related to certifier
                    String nombreCertificador = "CYBER ESPACIO,";
                    String nombreCertificador2 = "SOCIEDAD ANONIMA";
                    String nitCertificador = "77454820";
                    String direccionCertificador = "Edificio Paladium";
                    String separador = "                            ";
                    BluetoothAdapter btAdapter = PrintModule.getBTAdapter();
                    BluetoothDevice device = PrintModule.getDevice(btAdapter);
                    BluetoothSocket socket = null;
                    socket = PrintModule.getSocket(device);
                    String formatedTitleVenta = String.format("%-6s %-6s %-6s %-6s", "Cant.", "Des.", "Sub.",  "Tot.");
                    String formatedTotalVenta = String.format("%8s     %12s      ", "Total", "Q"+numeroTotal);
                    sendStringDataBT(nombreComercio,1,0,0);
                    sendStringDataBT("NIT: "+nitComercio,1,0,0);
                    //sendStringDataBT(direccionComercio,1,0,0);
                    sendStringDataBT(separador,1,0,1);
                    sendStringDataBT(tipoDocumentoTributario,1,1,0);
                    sendStringDataBT(separador,1,0,1);
                    sendStringDataBT(strFactura,1,1,0);
                    sendStringDataBT("Serie: "+numeroSerie,0,0,0);
                    sendStringDataBT("Numero: "+numeroDocumento,0,0,0);
                    sendStringDataBT("No. Autorizacion: ",0,0,0);
                    sendStringDataBT(numeroAutorizacion,1,0,0);
                    sendStringDataBT("Fecha Emision: ",0,0,0);
                    sendStringDataBT(fechaEmision,1,0,0);
                    sendStringDataBT(separador,1,0,1);
                    sendStringDataBT(strDatosCliente,1,1,0);
                    sendStringDataBT("Nombre: "+nombreCliente,0,0,0);
                    sendStringDataBT("NIT: "+nitCliente,0,0,0);
                    sendStringDataBT(separador,1,0,1);
                    sendStringDataBT(strDetalleVenta,1,1,0);
                    sendStringDataBT(formatedTitleVenta,1,1,0);
                    for (int i=0; i < strs.length; i++) {
                        if (strs[i] != null && strs[i].length() > 0 && strs[i].charAt(strs[i].length() - 1) == ',') {
                            strs[i] = strs[i].substring(0,strs[i].length() - 1);
                        }
                        JSONObject item = new JSONObject(strs[i]);
                        String precioItem = item.getString("price");
                        String nombreItem = item.getString("name");
                        String cantidadItem = item.getString("quantity");
                        int precio = Integer.parseInt(precioItem);
                        int cantidad = Integer.parseInt(cantidadItem);
                        int precioTotal = precio * cantidad;
                        String subTotal = String.valueOf(precioTotal);
                        if (nombreItem.length() >=6){
                            String nombreItemRemoved = nombreItem.substring(0,5);
                        }

                        String formatedDataVenta = String.format("%-6s %-6s %-6s %-6s", cantidadItem, nombreItem, "Q"+precioItem,  "Q"+precioTotal);
                        sendStringDataBT(formatedDataVenta,1,0,0);

                    }
                    sendStringDataBT(formatedTotalVenta,1,0,0);
                    sendStringDataBT(separador,1,0,1);
                    sendStringDataBT("Datos Certificador",1,1,0);
                    sendStringDataBT(nombreCertificador,1,0,0);
                    sendStringDataBT(nombreCertificador2,1,0,0);
                    sendStringDataBT("NIT: "+nitCertificador,1,0,0);
                    //sendStringDataBT(direccionCertificador,1,0,0);
                    sendStringDataBT("",1,0,0);
                    sendStringDataBT("",1,0,0);
                    sendStringDataBT("",1,0,0);
                    sendStringDataBT("",1,0,0);
                } catch (JSONException err){
                    Log.d("Error", err.toString());
                    //autorizacion.setText("Error Obteniendo Datos de Factura");
                } catch (IOException e) {
                    e.printStackTrace();
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

    public static byte[] nextLine(int lineNum) {
        byte[] result = new byte[lineNum];
        for (int i = 0; i < lineNum; i++) {
            result[i] = LF;
        }

        return result;
    }

    public static byte[] alignLeft() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 97;
        result[2] = 0;
        return result;
    }

    /**
     * 居中对齐
     */
    public static byte[] alignCenter() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 97;
        result[2] = 1;
        return result;
    }

    /**
     * 居右
     */
    public static byte[] alignRight() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 97;
        result[2] = 2;
        return result;
    }

    public static byte[] underlineWithOneDotWidthOn() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 45;
        result[2] = 1;
        return result;
    }

    public static byte[] underlineOff() {
        byte[] result = new byte[3];
        result[0] = ESC;
        result[1] = 45;
        result[2] = 0;
        return result;
    }



    public void sendStringDataBT(String stringdata, int align, int bold, int underline) throws IOException {
        BluetoothAdapter btAdapter = PrintModule.getBTAdapter();
        BluetoothDevice device = PrintModule.getDevice(btAdapter);
        BluetoothSocket socket = null;
        socket = PrintModule.getSocket(device);
        byte [] stringdataB = stringdata.getBytes();
        if (align == 0){
            PrintModule.sendData(alignLeft(), socket);
        }else if (align == 1){
            PrintModule.sendData(alignCenter(), socket);
        }else if (align == 1){
            PrintModule.sendData(alignRight(), socket);
        }else {
            PrintModule.sendData(alignLeft(), socket);
        }

        if (bold == 1){
            PrintModule.sendData(boldOn(), socket);
        } else {
            PrintModule.sendData(boldOff(), socket);
        }

        if (underline == 1){
            PrintModule.sendData(underlineWithOneDotWidthOn(), socket);
        } else {
            PrintModule.sendData(underlineOff(), socket);
        }

        PrintModule.sendData(stringdataB, socket);
        PrintModule.sendData(nextLine(1), socket);

        PrintModule.sendData(underlineOff(), socket);
        PrintModule.sendData(boldOff(), socket);

    }


}
