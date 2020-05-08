import React,{useState} from 'react';
import base64 from 'react-native-base64';
import {PermissionsAndroid, Alert} from "react-native";
import RNFetchBlob from 'rn-fetch-blob'
import fb from 'rn-fetch-blob'
import { Global } from '@jest/types';
const  DOMParser = require('xmldom').DOMParser;

delete Global.XMLHttpRequest;
const useApi = ()=>{

  const login = (body,res,rej)=>{
    loginOld(body,()=>{
      console.log(body);
      fetch('https://felgtaws.digifact.com.gt/felapi/api/login/get_token',{
      // fetch('https://felgttestaws.digifact.com.gt/felapi/api/login/get_token',{
        method:'POST',
        body:JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response=>{
        return response.json();
      }).then(response=>{
        console.log(` useDte res`,response);
        res(response);
      }).catch(err=>{
        console.log(` useDte rej`,err);
        rej(err)
      })
    })
  }


  const loginOld = (body,res) =>{
    // return fetch('https://felgtaws.digifact.com.gt/felapi/api/login/get_token',{
    return fetch('https://felgttest.digifact.com.gt/gt.com.fact.felapi/api/login/get_token',{
      method:'POST',
      body:JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>{
      return response.json();
    }).then(response=>{
      res();
    }).catch(err=>{
      res();
    })
  }

  const sendBill = (body,nit,token,res,rej)=>{
    console.log("send bill entrada");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=CERTIFICATE_DTE_XML_TOSIGN&FORMAT=PDF XML`,{
      // fetch(`https://felgttestaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=CERTIFICATE_DTE_XML_TOSIGN&FORMAT=PDF XML`,{
        method:'POST',
        body:body,
        headers: {
          'Content-Type': 'application/xml',
          'Authorization':token,
          'Accept':'application/json'
        }
      }).then(response=>{
        return response.json();
      }).then(response=>{
        console.log(response)
        if(response.Codigo==1)res(response);
        else rej('Ocurrio un error generando el documento')
      }).catch(err=>{
        console.log('sendBill',err);
        rej(err);
      })
    })
  }

  const cancelBill = (token,nit,id,body,res,rej)=>{
    console.log("entrada a cancelar documento");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=ANULAR_FEL_TOSIGN&FORMAT=PDF`,{
      // fetch(`https://felgttestaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=ANULAR_FEL_TOSIGN&FORMAT=PDF`,{
        method:'POST',
        body:body,
        headers: {
          'Content-Type': 'application/xml',
          'Authorization':token,
          'Accept':'application/json'
        }
        }).then(response=>{
          console.log(response);
          return response.json();
        }).then(response=>{
          console.log(response)
          if(response.Codigo==1)res(response);
          else rej('Ocurrion un error anulando el documento')
        }).catch(err=>{
          console.log('sendBill',err);
          rej(err);
        })
      })
  }

  const getBill = (token,nit,id,res,rej)=>{
    console.log("Entrada a get bill");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
      // fetch(`https://felgttestaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
        method:'GET',
        headers:{
          'Authorization':token
        }
      }).then(response=>{
        return response.json()
      }).then(response=>{
        if(response.Codigo == 1){
          res(response.ResponseDATA3)
          console.log("get bill response");
          console.log(response);
        }else{
          rej('Documento No Valido');
        }
      }).catch(err=>{
        console.log(err);
        rej('Error obteniendo documento')
      })
    })
  }

  const getBillXML = (token,nit,id,cant,desc,prec,res,rej)=>{
  // const getBillXML = (token,nit,id,cant,prec,desc,res,rej)=>{
    console.log("entrada get bill xml");

    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=XML&GUID=${id}`,{
      // fetch(`https://felgttestaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
        method:'GET',
        headers:{
          'Authorization':token
        }
      })
      //.then(res => res.text())
      .then(res=>{
        return res.json()
      })
      .then(response=>{
        if(response.Codigo == 1){
          res(response.ResponseDATA1)
          var xmlString = base64.decode(response.ResponseDATA1);
          let domparser = new DOMParser();
          let xmlStringF = domparser.parseFromString(xmlString, "text/xml");
          console.log(xmlStringF.getElementsByTagName('dte:Direccion')[0].firstChild.data); //emisor
          console.log(xmlStringF.getElementsByTagName('dte:NumeroAutorizacion')[0].firstChild.data);
          console.log(xmlStringF.getElementsByTagName('dte:FechaHoraCertificacion')[0].firstChild.data);
          console.log(xmlStringF.getElementsByTagName('dte:Direccion')[1].firstChild.data); //receptor
          //console.log(xmlStringF.getElementsByTagName("dte:DatosGenerales").attributes);
          let x = xmlStringF.getElementsByTagName("dte:Item");
          var cantidades = '';
          var precios = '';
          var descripciones = '';
          let y = x[0].getElementsByTagName("dte:Cantidad")[0].childNodes[0].nodeValue;
          for (i = 0; i < x.length; i++) {
            let canti = x[i].getElementsByTagName("dte:Cantidad")[0].childNodes[0].nodeValue;
            let preci = x[i].getElementsByTagName("dte:PrecioUnitario")[0].childNodes[0].nodeValue;
            let descri = x[i].getElementsByTagName("dte:Descripcion")[0].childNodes[0].nodeValue;
            cantidades = cantidades+`${canti},`;
            precios = precios+`${preci},`;
            descripciones = descripciones+`${descri},`;
          }
          console.log("cantidad")
          console.log(cantidades);
          console.log("descripciones")
          console.log(descripciones);
          console.log("precios")
          console.log(precios);
          cant(cantidades.substring(0,cantidades.length -1));
          desc(precios.substring(0,precios.length -1));
          prec(descripciones.substring(0,descripciones.length -1));
        }else{
          rej('Documento No Valido');
        }
      })
      .catch(err=>{
        console.log(err);
        rej('Error obteniendo documento')
      })
    })
  }

  const getBillSave = (token,nit,id,res,rej)=>{
    console.log("Entrada a get bill save")
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
      // fetch(`https://felgttestaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
        method:'GET',
        headers:{
          'Authorization':token
        }
      }).then(response=>{
        return response.json()
      }).then(response=>{
        console.log(response);
        if(response.Codigo == 1){
          res(response.ResponseDATA3)
        }else{
          rej('Documento No Valido');
        }
      }).catch(err=>{
        console.log(err);
        rej('Error obteniendo documento')
      })
    })
  }

  const getBillBack = (id,res,rej)=>{
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>FEL_GET_DOCUMENT</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>GT.000000123456.admon</UserName>
                    <Data1>${id}</Data1>
                    <Data2></Data2>
                    <Data3>PDF</Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        console.log('documento ',data);
        console.log(data.getElementsByTagName("Result")[0].firstChild.data);
        if( data.getElementsByTagName("Result")[0].firstChild.data === 'true') {
          res(data.getElementsByTagName("ResponseData3")[0].firstChild.data);
        }else{
          rej('Documento invalido');
        }
      })
      .catch(err=>{
        console.log(err);
        rej('Error obteniendo documento')
      })
    })
  }


  const sendemailBill = (body,res,rej)=>{
    console.log("send bill email entrada");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=CERTIFICATE_DTE_XML_TOSIGN&FORMAT=PDF XML`,{
        method:'POST',
        body:body,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response=>{
        console.log("Respuesta Send Bill Email")
        console.log(response)
        console.log("Body")
        console.log(body);
      }).catch(err=>{
        console.log('sendemailBill',err);
        rej(err);
      })
    })
  }

  const validateNit = (nit,cb,rej)=>{
    console.log("Validacion de Nit")
    console.log(nit);
    console.log(typeof nit)
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                  <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                  <Transaction>EXEC_STORED_PROC</Transaction>
                  <Country>GT</Country>
                  <Entity>000000123456</Entity>
                  <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                  <UserName>GT.000000123456.admon</UserName>
                  <Data1>GetAllDestinatariesLike</Data1>
                  <Data2>GT|123456|${nit}|</Data2>
                  <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        if( data.getElementsByTagName("ResponseData1")[0].firstChild.data ==1) {
          cb(data.getElementsByTagName("N")[0].firstChild.data);
        }else{
          rej('NIT INVALIDO');
        }
      })
      .catch(err=>{
        console.log(err);
        rej(500);
      })
    })
  }

  const getRequestor = (nit, name, cb, requestor, rej)=>{
    console.log("requestor entry");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xmlns:xsd="http://www.w3.org/2001/XMLSchema"
              xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>EXEC_STORED_PROC</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>GT.0000001234565.RESTLET</UserName>
                    <Data1>Account_Status_1</Data1>
                    <Data2>000035355913</Data2>
                    <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        if( data.getElementsByTagName("ResponseData1")[0].firstChild.data ==1) {
          cb(data.getElementsByTagName("TaxID")[0].firstChild.data);
          name(data.getElementsByTagName("Name")[0].firstChild.data);
          requestor(data.getElementsByTagName("RequestorGUID")[0].firstChild.data);
          console.log("requestor response successfull");
          console.log(cb);
          console.log(name);
          console.log(requestor);
        }else{
          rej('No se Puede Obtener el Requestor');
        }
      })
      .catch(err=>{
        console.log(err);
        rej(500);
      })
    })
  }

  const getInfo = (nit, name, calle, direccion, zona,frases,afiliacion,zipcode, nombreComercial,direccionComercial, rej)=>{
    console.log("info entry");
      loginOld({username:null,password:null},()=>{
        fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
          method:'POST',
          body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                      <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                        <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                        <Transaction>EXEC_STORED_PROC</Transaction>
                        <Country>GT</Country>
                        <Entity>000000123456</Entity>
                        <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                        <UserName>GT.000000123456.RESTLET</UserName>
                        <Data1>PLANILLACC_GetInfoFiscalFELFORM</Data1>
                        <Data2>NIT|${nit}</Data2>
                        <Data3></Data3>
                      </RequestTransaction>
                    </soap:Body>
                </soap:Envelope>`,
          headers: {
            'Content-Type': 'text/xml',
          }
        }).then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
        .then(data => {
          console.log("respuesta get info");
          if( data.getElementsByTagName("ResponseData1")[0].firstChild.data ==1) {
            name(data.getElementsByTagName("Nom")[0].firstChild.data);
            calle(data.getElementsByTagName("Ca")[0].firstChild.data);
            direccion(data.getElementsByTagName("NC")[0].firstChild.data);
            zona(data.getElementsByTagName("zon")[0].firstChild.data);
            frases(data.getElementsByTagName("FRASES")[0].firstChild.data);
            //frases(data.getElementsByTagName("FRASES")[0].firstChild.data);
            afiliacion(data.getElementsByTagName("AfiliacionIVA")[0].firstChild.data);
            zipcode(data.getElementsByTagName("ESTCODPOSTAL")[0].firstChild.data);
            nombreComercial(data.getElementsByTagName("EST")[0].firstChild.data);
            direccionComercial(data.getElementsByTagName("ESTDIR")[0].firstChild.data);
            console.log("info response successfull");
          }else{
            //rej('No se Puede Obtener info de el emisor');
            //console.log("No se puede obtener la informacion del emisor");
          }
        })
        .catch(err=>{
          console.log(err);
          rej(500);
        })
      })
  }


  const addProduct = (nit,name,price,type,res,rej)=>{

    console.log("entrada a addProduct");

    if (type == "BIEN") {
      var fullType = "BIEN";
    } else if (type == "SERVICIO") {
      var fullType = "SERVICIO";
    } else {
      var fullType = "BIEN";
    }

    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>EXEC_STORED_PROC</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>GT.000000123456.MARIESLOSPOSTMAS</UserName>
                     <Data1>UpsertProductsAndServices</Data1>
                    <Data2>GT|${nit}|${name}|${price}|0|UNI|5|000|00000|juan|0|0|${fullType}</Data2>
                    <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {

        if( data.getElementsByTagName("Result")[0].firstChild.data === 'true') {
          res("Producto agregado con exito");
        }else{
          rej('No se pudo agregar el producto');
        }
      })
      .catch(err=>{
        console.log(err);
        rej('Error agregando productos')
      })
    })
  }


  const deleteProduct = (nit,name,res,rej)=>{

    console.log("entrada a deleteProduct");

    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>EXEC_STORED_PROC</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>GT.000000123456.MARIESLOSPOSTMAS</UserName>
                     <Data1>DeleteProductsAndServices</Data1>
                    <Data2>GT|${nit}|${name}</Data2>
                    <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        console.log(data.getElementsByTagName("Result")[0].firstChild.data);
        if( data.getElementsByTagName("Result")[0].firstChild.data === 'true') {
          res("Producto borrado con exito");
        }else{
          rej('No se pudo borrar el producto');
        }
      })
      .catch(err=>{
        console.log(err);
        rej('Error borrando productos')
        console.log("body sent")
        console.log(body)
      })
    })
  }

  const getAllProducts = (nit,name,price,type,rej)=>{

    console.log("entrada a getAllProducts");

    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
      // fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>EXEC_STORED_PROC</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>GT.000000123456.MARIESLOSPOSTMAS</UserName>
                    <Data1>GetAllProductsAndServices</Data1>
                    <Data2>GT|${nit}</Data2>
                    <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        if( data.getElementsByTagName("ResponseData1")[0].firstChild.data > 0) {
          //res("Se Encontraron Productos Registrados");
          var nombres = '';
          var precios = '';
          var tipos = '';
          let x = data.getElementsByTagName("T");

          for (i = 0; i < x.length; i++) {
            let nom = x[i].getElementsByTagName("D")[0].childNodes[0].nodeValue;
            let pre = x[i].getElementsByTagName("LP")[0].childNodes[0].nodeValue;
            let tip = x[i].getElementsByTagName("CTG")[0].childNodes[0].nodeValue;
            nombres = nombres+`${nom}|`;
            precios = precios+`${pre}|`;
            tipos = tipos+`${tip}|`;
          }
          console.log("nombres")
          console.log(nombres);
          console.log("tipos")
          console.log(tipos);
          console.log("precios")
          console.log(precios);

          name(nombres.substring(0,nombres.length -1));
          type(tipos.substring(0,tipos.length -1));
          price(precios.substring(0,precios.length -1));

        }else{
          // rej('No se encuentran productos registrados');
        }
      })
      .catch(err=>{

        rej(500);

      })
    })
  }



  const forgotPassword = (username,res,rej)=>{
    console.log("entrada a forgotPassword");
    loginOld({username:null,password:null},()=>{
      fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
        method:'POST',
        body:`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                  <RequestTransaction xmlns="http://www.fact.com.mx/schema/ws">
                    <Requestor>D06A8F37-2D87-43D2-B977-04D503532786</Requestor>
                    <Transaction>PASSWORD_FORGOT</Transaction>
                    <Country>GT</Country>
                    <Entity>000000123456</Entity>
                    <User>D06A8F37-2D87-43D2-B977-04D503532786</User>
                    <UserName>${username}</UserName>
                     <Data1></Data1>
                    <Data2></Data2>
                    <Data3></Data3>
                  </RequestTransaction>
                </soap:Body>
              </soap:Envelope>`,
        headers: {
          'Content-Type': 'text/xml',
        }
      }).then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml").documentElement)
      .then(data => {
        if( data.getElementsByTagName("Result")[0].firstChild.data === 'true') {
          res("La clave temporal ha sido enviada por correo electronico");
        }else{
          rej('Verifique el usuario y nit ingresado');
        }
      })
      .catch(err=>{
        console.log(err);
        rej('Error recuperando clave')
      })
    })
  }






  function PadLeft(value, length) {
		return (value.toString().length < length) ? PadLeft("0" + value, length) :
		value;
	}

  return {
   login,
   sendBill,
   getBill,
   getBillXML,
   getBillSave,
   validateNit,
   getRequestor,
   cancelBill,
   getInfo,
   sendemailBill,
   addProduct,
   deleteProduct,
   getAllProducts,
   forgotPassword,
	};
}

export default useApi;
