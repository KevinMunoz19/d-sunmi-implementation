var data = {
	issueDate:"2019-09-18T15:48:32",
	issueComercialName:"TEST",
	issueName:"TEST",
	issueNit:"123456",
	issueAddress:"CALLE 101 CALLE",
	issueZipCode:"01001",
	issueMunicipality:"TEST",
	issueDepartment:"TEST",
	receiverEmail:"andresmanuelduque@gmail.com",
	receiverName:"Carlos Culajay",
	receiverNit:"3299112",
	receiverAddress:"4av 5-80 z21",
	receiverZipCode:"01001",
	receiverMonicipality:"Guatemala",
	receiverDepartment:"Guatemala",
	items:[
		{
			type:"B", // B (bien)  o S (Servicio)
			quantity:1,
			measurement:"KG",
			description:"item",
			unitPrice:25
		}
	]

}

build(data);

function build(data){
	var items = buildItems(data.items);
	var xmlString = 
	`
	<?xml version='1.0' encoding='UTF-8'?>
	<dte:GTDocumento xmlns:dte="http://www.sat.gob.gt/dte/fel/0.1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="0.4">
	    <dte:SAT ClaseDocumento="dte">
	        <dte:DTE ID="DatosCertificados">
	            <dte:DatosEmision ID="DatosEmision">               
	                <dte:DatosGenerales CodigoMoneda="GTQ" FechaHoraEmision="${data.issueDate}" Tipo="FACT"/>                               
	                <dte:Emisor AfiliacionIVA="GEN" 
	                    NombreComercial="${data.issueComercialName}" 
	                    CodigoEstablecimiento="1" 
	                    NombreEmisor="${data.issueName}" 
	                    NITEmisor="${data.issueNit}">                                       
	                    <dte:DireccionEmisor>                        
	                        <dte:Direccion>${data.issueAddress}</dte:Direccion>                       
	                        <dte:CodigoPostal>${data.issueZipCode}</dte:CodigoPostal>                        
	                        <dte:Municipio>${data.issueMunicipality}</dte:Municipio>                        
	                        <dte:Departamento>${data.issueDepartment}</dte:Departamento>                        
	                        <dte:Pais>GT</dte:Pais>                        
	                    </dte:DireccionEmisor>                    
	                </dte:Emisor>
	                <dte:Receptor CorreoReceptor="${data.receiverEmail}"
	                    NombreReceptor="${data.receiverName}" IDReceptor="${data.receiverNit}">
	                    <dte:DireccionReceptor>
	                        <dte:Direccion>${data.receiverAddress}</dte:Direccion>
	                        <dte:CodigoPostal>${data.receiverZipCode}</dte:CodigoPostal>
	                        <dte:Municipio>${data.receiverMonicipality}</dte:Municipio>
	                        <dte:Departamento>${data.receiverDepartment}</dte:Departamento>
	                        <dte:Pais>GT</dte:Pais>
	                    </dte:DireccionReceptor>
	                </dte:Receptor>
	                <dte:Frases>
	                    <dte:Frase TipoFrase="1" CodigoEscenario="1"/>
	                </dte:Frases>
	                <dte:Items>
	                	${items.itemsString}
	                </dte:Items>
	                <dte:Totales>
	                    <dte:TotalImpuestos>
	                        <dte:TotalImpuesto NombreCorto="IVA" TotalMontoImpuesto="${items.totalTaxAmount}"/>
	                    </dte:TotalImpuestos>
	                    <dte:GranTotal>${items.totalAmount}</dte:GranTotal>
	                </dte:Totales>
	            </dte:DatosEmision>
	        </dte:DTE>
	    </dte:SAT>       
	</dte:GTDocumento>
	`;

	console.log(xmlString);
}

function buildItems(items){
	var totalAmount = 0;
	var totalTaxAmount = 0;
	var itemsString = ``;
	var iva = 12;
	items.forEach((item,i)=>{
		var taxableAmount = (item.unitPrice / ((iva * 0.01) + 1)) * item.quantity;
		var taxAmount = (iva * 0.01) * taxableAmount;
		var totalItemAmount = item.unitPrice * item.quantity;
		totalAmount += totalItemAmount;
		totalTaxAmount += taxAmount;
		itemsString = itemsString+
		`
			<dte:Item NumeroLinea="${i}" BienOServicio="${item.type}">
                  <dte:Cantidad>${item.quantity}</dte:Cantidad>
                  <dte:UnidadMedida>${item.measurement}</dte:UnidadMedida>
                  <dte:Descripcion>${item.description}</dte:Descripcion>
                  <dte:PrecioUnitario>${item.unitPrice}</dte:PrecioUnitario>
                  <dte:Precio>${totalItemAmount}</dte:Precio>
                  <dte:Descuento>0</dte:Descuento>
	              <dte:Impuestos>
	                 <dte:Impuesto>
	                    <dte:NombreCorto>IVA</dte:NombreCorto>
	                    <dte:CodigoUnidadGravable>1</dte:CodigoUnidadGravable>
	                    <dte:MontoGravable>${taxableAmount}</dte:MontoGravable>
	                    <dte:MontoImpuesto>${taxAmount}</dte:MontoImpuesto>
	                 </dte:Impuesto>
	              </dte:Impuestos>
	              <dte:Total>${totalItemAmount}</dte:Total>
           </dte:Item>
		`;

	});
	return {
		itemsString,
		totalAmount,
		totalTaxAmount 
	}
}