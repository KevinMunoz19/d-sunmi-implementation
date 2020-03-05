import React,{useState} from 'react';
import useApi from './useApi';
import base64 from 'react-native-base64';
var DOMParser = require('xmldom').DOMParser;
import DB from './DB';

const useDte = (props) => {
    const [dteString,setDteString] = useState('');
    const [dte,setDte] = useState({});
    const {sendBill,cancelBill} = useApi();
    const {insert} = DB();


    const cancelDte = (user,dteInfo,res,rej)=>{
        console.warn(dteInfo.date);
        var body = `
        <?xml version='1.0' encoding='utf-8'?>
            <dte:GTAnulacionDocumento xmlns:dte="http://www.sat.gob.gt/dte/fel/0.1.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                Version="0.1">
                <dte:SAT>
                    <dte:AnulacionDTE ID="DatosCertificados">
                        <dte:DatosGenerales ID="DatosAnulacion" NumeroDocumentoAAnular="${dteInfo.auth_number}" NITEmisor="${user.string_nit.replace(/0+(?!$)/,'')}"
                            IDReceptor="${dteInfo.receiver_nit}" FechaEmisionDocumentoAnular="${new Date(dteInfo.date.replace(' ','T')).toISOString()}"
                            FechaHoraAnulacion="${new Date().toISOString()}" MotivoAnulacion="Anulado"/>
                    </dte:AnulacionDTE>
                </dte:SAT>
            </dte:GTAnulacionDocumento>
        `;
        console.log(body);
        cancelBill(user.token,user.string_nit,dteInfo.auth_number,body,()=>{
            var query = `UPDATE dte set status = ? where auth_number = ?`;
            insert(query,[0,dteInfo.auth_number],(result)=>{
                res();
            },(err)=>{
                rej("Error actualizando el estado del documento a 'ANULADO'")
            })
        },(err)=>{
            rej(err)
        })
    }
    const generateString = (products,client,cf,iva,email,user,res,rej)=>{
        var {itemsString,totalAmount,totalTaxAmount } = generateItemString(products,client,cf,iva);

        var issueComercialName="TEST";
        var issueName=user.name;
        var issueNit=user.string_nit.replace(/0+(?!$)/,'');
        var issueAddress="CALLE 101 CALLE";
        var issueZipCode=101;
        var issueMunicipality="TEST";
        var issueDepartment="TEST";
        if(cf){
            var receiverName = 'CONSUMIDOR FINAL';
            var receiverNit = 'CF';
            var receiverAddress = '5TA AVENIDA 16-65';
            var receiverZipCode = 101;
            var receiverMunicipality = 101;
            var receiverDepartment = 101;
        }else{
            var receiverName = client.name;
            var receiverNit = client.nit.replace(/0+(?!$)/,'');
            var receiverAddress = client.address;
            var receiverZipCode = client.zip_code;
            var receiverMunicipality = client.municipality;
            var receiverDepartment = client.department;
        }

        if(iva > 0 ){
            var taxShortName = 'IVA';
        }else{
            var taxShortName = 'CERO';
        }
        var xmlString =
        `
        <?xml version='1.0' encoding='UTF-8'?>
        <dte:GTDocumento xmlns:dte="http://www.sat.gob.gt/dte/fel/0.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="0.4">
            <dte:SAT ClaseDocumento="dte">
                <dte:DTE ID="DatosCertificados">
                    <dte:DatosEmision ID="DatosEmision">
                        <dte:DatosGenerales CodigoMoneda="GTQ" FechaHoraEmision="${new Date().toISOString()}" Tipo="FACT"/>
                        <dte:Emisor AfiliacionIVA="GEN"
                            NombreComercial="${issueComercialName}"
                            CodigoEstablecimiento="1"
                            NombreEmisor="${issueName}"
                            NITEmisor="${issueNit}">
                            <dte:DireccionEmisor>
                                <dte:Direccion>${issueAddress}</dte:Direccion>
                                <dte:CodigoPostal>${issueZipCode}</dte:CodigoPostal>
                                <dte:Municipio>${issueMunicipality}</dte:Municipio>
                                <dte:Departamento>${issueDepartment}</dte:Departamento>
                                <dte:Pais>GT</dte:Pais>
                            </dte:DireccionEmisor>
                        </dte:Emisor>
                        <dte:Receptor CorreoReceptor="${email}"
                            NombreReceptor="${receiverName}" IDReceptor="${receiverNit}">
                            <dte:DireccionReceptor>
                                <dte:Direccion>${receiverAddress}</dte:Direccion>
                                <dte:CodigoPostal>${receiverZipCode}</dte:CodigoPostal>
                                <dte:Municipio>${receiverMunicipality}</dte:Municipio>
                                <dte:Departamento>${receiverDepartment}</dte:Departamento>
                                <dte:Pais>GT</dte:Pais>
                            </dte:DireccionReceptor>
                        </dte:Receptor>
                        <dte:Frases>
                            <dte:Frase TipoFrase="1" CodigoEscenario="1"/>
                        </dte:Frases>
                        <dte:Items>
                            ${itemsString}
                        </dte:Items>
                        <dte:Totales>
                            <dte:TotalImpuestos>
                                <dte:TotalImpuesto NombreCorto="${taxShortName}" TotalMontoImpuesto="${totalTaxAmount.toFixed(2)}"/>
                            </dte:TotalImpuestos>
                            <dte:GranTotal>${totalAmount}</dte:GranTotal>
                        </dte:Totales>
                    </dte:DatosEmision>
                </dte:DTE>
            </dte:SAT>
        </dte:GTDocumento>
        `;
        console.log(xmlString);
        sendBill(xmlString,user.string_nit,user.token,(response)=>{
            console.log(response.ResponseDATA3);
            saveDte(response.ResponseDATA1,receiverName,receiverNit);
            res(response.ResponseDATA3)
        },(err)=>{
            rej(err);
        })

    }

    const saveDte = (encode,receiverName,receiverNit)=>{
        let xmlString = base64.decode(encode);
        console.log('xmlString',xmlString);
        let xml = new DOMParser().parseFromString(xmlString, "text/xml").documentElement;
        var authNumberTag = xml.getElementsByTagName("dte:NumeroAutorizacion")[0];
        var total = xml.getElementsByTagName("dte:GranTotal")[0].firstChild.data;
        var authNumber = authNumberTag.firstChild.data;
        var dteNumber = authNumberTag.getAttribute('Numero');
        var serie = authNumberTag.getAttribute('Serie');
        var query =    `INSERT INTO dte(receiver_name,receiver_nit,date,amount,serie,number,auth_number) values (?,?,DATETIME('now'),?,?,?,?)`;
        insert(query,[receiverName,receiverNit,total,serie,dteNumber,authNumber],(result)=>{
            console.log('DTE registrado con exito');
        },(err)=>{
            console.log('ocurrio un error registrando el dte', err);
        })
        console.log('otros' ,authNumber,dteNumber,serie);
    }

    const generateItemString = (products,client,cf,iva)=>{

        var totalAmount = 0;
	    var totalTaxAmount = 0;
        var itemsString = ``;
        if(iva > 0 ){
            var taxShortName = 'IVA';
            var taxCodeNumber = 1;
        }else{
            var taxShortName = 'CERO';
            var taxCodeNumber = 2;
        }

        products.forEach((product,i)=>{


            //buscar tipo de bien o servicio
            // buscar tipos de medidas
            var taxableAmount = iva == 0?(product.price * product.quantity) : (product.price / ((iva * 0.01) + 1)) * product.quantity;
            var taxAmount = (iva * 0.01) * taxableAmount;
            var totalItemAmount = product.price * product.quantity;
            totalAmount += totalItemAmount;
            totalTaxAmount += taxAmount;
            itemsString = itemsString+
            `
                <dte:Item NumeroLinea="${i+1}" BienOServicio="B">
                    <dte:Cantidad>${product.quantity}</dte:Cantidad>
                    <dte:UnidadMedida>CA</dte:UnidadMedida>
                    <dte:Descripcion>item</dte:Descripcion>
                    <dte:PrecioUnitario>${product.price}</dte:PrecioUnitario>
                    <dte:Precio>${totalItemAmount.toFixed(2)}</dte:Precio>
                    <dte:Descuento>0</dte:Descuento>
                    <dte:Impuestos>
                        <dte:Impuesto>
                            <dte:NombreCorto>${taxShortName}</dte:NombreCorto>
                            <dte:CodigoUnidadGravable>${taxCodeNumber}</dte:CodigoUnidadGravable>
                            <dte:MontoGravable>${taxableAmount.toFixed(2)}</dte:MontoGravable>
                            <dte:MontoImpuesto>${taxAmount.toFixed(2)}</dte:MontoImpuesto>
                        </dte:Impuesto>
                    </dte:Impuestos>
                    <dte:Total>${totalItemAmount.toFixed(2)}</dte:Total>
            </dte:Item>
            `;

        });
        return {
            itemsString,
            totalAmount,
            totalTaxAmount
        }
    }

    const generateTotals = (products,iva,setTotal,setSubTotal)=>{
        var totalAmount = 0;
	    var totalTaxAmount = 0;
	    var itemsString = ``;
        products.forEach((product,i)=>{
            var taxableAmount = iva == 0?(product.price * product.quantity) : (product.price / ((iva * 0.01) + 1)) * product.quantity;
            var taxAmount = (iva * 0.01) * taxableAmount;
            var totalItemAmount = product.price * product.quantity;
            totalAmount += totalItemAmount;
            totalTaxAmount += taxAmount;
        });
        setTotal(totalAmount.toFixed(2).toLocaleString('USD'));
        setSubTotal((totalAmount - totalTaxAmount).toFixed(2).toLocaleString('USD'));
    }

    return {
        generateTotals,
        generateString,
        cancelDte
	};

}

export default useDte;
