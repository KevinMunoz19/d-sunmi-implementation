var DOMParser = require('xmldom').DOMParser;

const validateNit= (nit,cb,rej)=>{
	
	var request = new XMLHttpRequest();
	request.open('POST', 'https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx');
	request.onreadystatechange = (e) => {
		if (request.status === 200) {
			console.log('success', request.responseText);
			cb(request.responseText);
		} else {
			console.log(request.responseText);
			console.log(e);
			rej(e);
		}
	};
	var body = `<?xml version="1.0" encoding="utf-8"?>
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
	</soap:Envelope>`;
	request.setRequestHeader('Content-Type', 'text/xml');
	
	request.send(body);
}
function validateNitFetch(nit,cb,rej){
	fetch(`https://felgttestaws.digifact.com.gt/mx.com.fact.wsfront/factwsfront.asmx`,{
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
		console.log(data);
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
	
}

export {validateNit}