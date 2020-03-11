import React,{useState} from 'react';

import fb from 'rn-fetch-blob'
import { Global } from '@jest/types';
const  DOMParser = require('xmldom').DOMParser;
delete Global.XMLHttpRequest;
const useApi = ()=>{

    const login = (body,res,rej)=>{
        loginOld(body,()=>{
            console.log(body);
            fetch('https://felgtaws.digifact.com.gt/felapi/api/login/get_token',{
            //fetch('https://felgttestaws.digifact.com.gt/felapi/api/login/get_token',{
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
      console.log("Entrada a login old")
        //return fetch('https://felgtaws.digifact.com.gt/felapi/api/login/get_token',{
        return fetch('https://felgt.digifact.com.gt/gt.com.fact.felapi/api/login/get_token',{

            method:'POST',
            body:JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response=>{
            console.log("login old response");
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
            //fetch(`https://felgttestaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=CERTIFICATE_DTE_XML_TOSIGN&FORMAT=PDF XML`,{
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
        loginOld({username:null,password:null},()=>{
            fetch(`https://felgtaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=ANULAR_FEL_TOSIGN&FORMAT=PDF`,{
            //fetch(`https://felgttestaws.digifact.com.gt/felapi/api/FELRequest?NIT=${nit}&TIPO=ANULAR_FEL_TOSIGN&FORMAT=PDF`,{
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
        loginOld({username:null,password:null},()=>{
          fetch(`https://felgtaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
            //fetch(`https://felgttestaws.digifact.com.gt/guestapi/api/FELRequest?NIT=${nit}&TIPO=GET_DOCUMENT&FORMAT=PDF&GUID=${id}`,{
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
            //fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
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

    const validateNit = (nit,cb,rej)=>{
      console.log(nit);
      console.log(typeof nit)
        loginOld({username:null,password:null},()=>{
            fetch(`https://felgtaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
            //fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
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
                    <Data2>GT|123456|${nit}|</Data2>\
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
            //fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
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
                console.log("requestor response");

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
            //fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
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
                            <Data2>NIT|35355913</Data2>
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
                    //console.log("info response successfull");
                }else{
                    rej('No se Puede Obtener info de el emisor');
                }
                //console.log("info response");
            })
            .catch(err=>{
                console.log(err);
                rej(500);
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
       validateNit,
       getRequestor,
       //validateNitNuevo,
       cancelBill,
       getInfo
	};
}

export default useApi;
