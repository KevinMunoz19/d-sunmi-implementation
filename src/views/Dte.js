import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
	View,
	Label,
	Switch,
	Button,
	TextInput,
	Modal,
	Picker,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
  ActivityIndicator,
	Alert,
	ButtonGroup,
	Linking,
	requireNativeComponent,
	NativeModules,
	NativeEventEmitter,
}	from 'react-native';


import AppLink from 'react-native-app-link';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from 'react-native-router-flux';
import Clients from './Clients';
import Client from './Client';
import Products from './Products'
import Product from './Product';
import ProductBox from '../components/ProductBox';
import PdfView from '../components/PdfView';
import useDte from '../utils/useDte';
import useApi from '../utils/useApi';
import useUser from '../utils/useUser';
import useLastDte from '../utils/useLastDte';
import useClientForm from '../utils/useClientForm';
import IosHeader from '../components/IosHeader';
import DB from '../utils/DB';
import SectionDivider from '../components/SectionDivider.component';
import { validateEmail } from '../utils/emailValidator';
const Sw = requireNativeComponent('Sw');
const activityStarter = NativeModules.ActivityStarter;
const eventEmitterModule = NativeModules.EventEmitter;
const printer = NativeModules.PrintModule;
import colorPalette from '../utils/colors';


const Dte = () =>{
	const [cf,setCf] = useState(false);
	const {inputs,setInputs, handleInputChange, handleSubmit} = useClientForm();
	const [clientModalVisible,setClientModalVisible] = useState(false);
	const [createClientModalVisible,setCreateClientModalVisible] = useState(false);
	const [productModalVisible,setProductModalVisible] = useState(false);
	const [createProductModalVisible,setCreateProductModalVisible] = useState(false);
	const [pdfModalVisible,setPdfModalVisible] = useState(false);
	const [email,setEmail] = useState('');
	const [nit,setNit] = useState(0);
	const [name,setName] = useState('');
	const [client,setClient] = useState({nit: '',name:'Seleccione un cliente'});
	const [iva,setIva] = useState(12);
	const [products,setProducts] = useState([]);
	const [total,setTotal] = useState(0);
	const [subTotal,setSubTotal] = useState(0);
	const {generateTotals,generateString,generateEmailString} = useDte();
	const {getUser} = useUser();
	const [user,setUser] = useState();
	const {findByNit} = useClientForm();
	const [isNit,setIsNit] = useState(false);
	const [pdfSource,setPdfSource] = useState(null);
	const [loading,setLoading] = useState(false);
	const [nombretemporal,setNombreTemporal] = useState('');
	const [nitTemporal,setNitTemporal] = useState('');
	const [visibleButton,setVisibleButton] = useState(false);
	const [userSend,setUserSend] = useState();
	const [productsSend,setProductsSend] = useState([]);
	const {select} = DB();
	const [documento,setDocumento] = useState([]);
	const {getBill, getInfo} = useApi();


	const [nn,setNn] = useState('');
	const [calle,setCalle] = useState('');
	const [direccion,setDireccion] = useState('');
	const [zona,setZona] = useState('');
	const [frases,setFrases] = useState('');
	const [afiliacion,setAfiliacion] = useState('');
	const [zipc,setZipc] = useState('');
	const [nombreComercial,setNombreComercial] = useState('');
	const [direccionComercial,setDireccionComercial] = useState('');
	const [numEstablecimiento,setNumEstablecimiento] = useState();
	const [autorizacion,setAutorizacion] = useState('');

	const [payment,setPayment] = useState(0);

	const [estNumber, setEstNumber] = useState(0);
	const [arrayZc,setArrayZc] = useState([]);
  const [arrayNc,setArrayNc] = useState([]);
  const [arrayDc,setArrayDc] = useState([]);

	const [nnPrint,setNnPrint] = useState('');
	const [nombreComercialPrint,setNombreComercialPrint] = useState('');
	const [direccionComercialPrint,setDireccionComercialPrint] = useState('');

	const [visibleUniqueProduct,setVisibleUniqueProduct] = useState(false);
	const [cantidadUniqueProduct,setCantidadUniqueProduct] = useState(0);
	const [precioUniqueProduct,setPrecioUniqueProduct] = useState(0);
	const [nombreUniqueProduct,setNombreUniqueProduct] = useState('');

	const radioProps = [
		{label: 'Nit  ', value: false },
		{label: 'CF	', value: true }
	];

	const radioIVA = [
		{label:'12%  ',value:12},
		{label:'Exento',value:0}
	]

	const radioPaymentType = [
		{label: 'Efectivo ', value: 0 },
		{label: 'Cheque   ', value: 1 },
		{label: 'Tarjeta  ', value: 2 }
	];

	useEffect(()=>{
		generateTotals(products,iva,setTotal,setSubTotal)
	},[products,iva])

	useEffect(()=>{
		if(pdfSource != null){
			setLoading(false);
			setPdfModalVisible(true);
		}
	},[pdfSource])

	useEffect(()=>{
		getUser((userInfo)=>{
			setNumEstablecimiento(0);
			setUser(userInfo);
			setNitTemporal(userInfo.string_nit.replace(/0+(?!$)/,''));

		})
	},[])

	useEffect(()=>{
		// getInfo(newnitfetch, (nom)=>{
		getInfo(nitTemporal, (nom)=>{
			setNn(nom.toString())
		},(ca)=>{
			setCalle(ca.toString())
		},
		(dir)=>{
			setDireccion(dir.toString())
		},
		(zon)=>{
			setZona(zon.toString())
		},
		(fr)=>{
			setFrases(fr.toString())
		},
		(af)=>{
			setAfiliacion(af.toString())
		},
		(zpc)=>{
			setZipc(zpc.toString())
		},
		(nomc)=>{
			setNombreComercial(nomc.toString())
		},
		(dirc)=>{
			setDireccionComercial(dirc.toString())
		},
		(err)=>{
			if(err==200){
				Alert.alert('Error de conexion');
			}else{
				Alert.alert(err);
			}
		});
	},[nitTemporal])

	useEffect(()=>{
		var zcArray = zipc.trim().split('|');
		setArrayZc(zcArray);
		var ncArray = nombreComercial.trim().split('|');
		setArrayNc(ncArray);
		var dcArray = direccionComercial.trim().split('|');
		setArrayDc(dcArray);

	},[zipc,nombreComercial,direccionComercial])



	const onClientSelect = (client)=>{
		setTimeout(()=>{
			setClientModalVisible(false);
			setCreateClientModalVisible(false);
		},500)
		setEmail(client.email);
		setNit(client.nit);
		setClient(client);
		setNit(client.nit);
	}

	const findClient = (nit)=>{
		setNit(nit);
		findByNit(nit,(result)=>{
			if(result.length > 0){
				setClient(result[0]);
				setNit(result[0].nit);
				setEmail(result[0].email);
				setIsNit(true);
			}
			else{
				setEmail('');
				setIsNit(false);
				setClient({name:'Nit no se encuentra en su lista de clientes'});
			}
		})
	}

	const onProductSelect = (product)=>{

		console.warn('pasa el producto a la vista de dte');
		setTimeout(()=>{
			if(createProductModalVisible)setCreateProductModalVisible(false);
			if(productModalVisible) setProductModalVisible(false);
		},500)
		setProducts([...products,product]);

		//
		// var newnitfetch = user.string_nit.replace(/0+(?!$)/,'')
		//
		// getInfo(newnitfetch, (nom)=>{
		// 	setNn(nom.toString())
		// },(ca)=>{
		// 	setCalle(ca.toString())
		// },
		// (dir)=>{
		// 	setDireccion(dir.toString())
		// },
		// (zon)=>{
		// 	setZona(zon.toString())
		// },
		// (fr)=>{
		// 	setFrases(fr.toString())
		// },
		// (af)=>{
		// 	setAfiliacion(af.toString())
		// },
		// (zpc)=>{
		// 	setZipc(zpc.toString())
		// },
		// (nomc)=>{
		// 	setNombreComercial(nomc.toString())
		// },
		// (dirc)=>{
		// 	setDireccionComercial(dirc.toString())
		// },
		// (err)=>{
		// 	if(err==200){
		// 		Alert.alert('Error de conexion');
		// 	}else{
		// 		Alert.alert(err);
		// 	}
		// });

		//
		// console.log("numero de establecimiento seleccionado");
		// console.log(estNumber);
		// console.log(typeof estNumber);

	}

	const onUniqueProduct = ()=> {
		console.log("Entrada a onUniqueProduct")
		setVisibleUniqueProduct(true);
	}

	// const onUniqueProductAdd = ()=> {
	// 	console.log("Entrada a onUniqueProductAdd")
	// 	setVisibleUniqueProduct(false);
	// 	addUP();
	// }
	//
	// function addUP() {
	// 	if (cantidadUniqueProduct <= 0.0 || precioUniqueProduct <= 0.0 || nombreUniqueProduct.trim() == ""){
	// 		Alert.alert('Verifica los datos! Todos los datos son requeridos');
	// 	} else {
	// 		var uniqueProduct = { price: precioUniqueProduct, code: "uniqueproduct", name: nombreUniqueProduct, id: 150, quantity: cantidadUniqueProduct };
	// 		console.log("Precio DB");
	// 		console.log(uniqueProduct);
	// 		setProducts([...products,uniqueProduct]);
	// 	}
	//
	// 	setCantidadUniqueProduct(0);
	// 	setPrecioUniqueProduct(0);
	// 	setNombreUniqueProduct("");
	// }

	const onProductRemove = (productToRemove)=>{
		setProducts(products.filter(product=> (product.id != productToRemove.id && product.quantity != productToRemove.quantity)));
	}

	const createProduct = ()=>{
		setProductModalVisible(false);
		setCreateProductModalVisible(true);
	}

	const createClient = ()=>{
		setClientModalVisible(false);
		setCreateClientModalVisible(true);
	}

	const onGenerate = ()=>{
		setLoading(true);
		var direccionComercialArray = direccionComercial.trim().split('|');
		var direccionComercialClean = direccionComercialArray[estNumber].replace(/ +(?= )/g,'');
		var nombreComercialArray = nombreComercial.trim().split('|');
		var nombreComercialClean = nombreComercialArray[estNumber].toString().trim();
		while (nombreComercialClean.substring(0,1) == "<" || (nombreComercialClean.substring(0,1) >='0' && nombreComercialClean.substring(0,1) <='9')) {
			nombreComercialClean = nombreComercialClean.substring(1);
		}
		setNombreComercialPrint(nombreComercialClean);
		setDireccionComercialPrint(direccionComercialClean);
		setNnPrint(nn);
		if (user) {
			if (email.trim().length > 0 ? validateEmail(email) : true){
				if (products.length > 0) {
					if((!cf && client.nit.trim().length > 0) || cf) {
						if(iva == 0 || iva == 12){
							generateString(products,client,cf,iva,email,user, nn, calle, direccion, zona, frases, afiliacion,zipc, nombreComercial, direccionComercial, estNumber,payment, (res)=>{
							// generateString(products,client,cf,iva,email,user, nn, calle, direccion, zona, frases, afiliacion,zipc, nombreComercial, direccionComercial, numEstablecimiento,payment, (res)=>{
							//generateString(products,client,cf,iva,email,user, nn, calle, direccion, zona, frases, afiliacion,zipc, nombreComercial,direccionComercial, (res)=>{
								console.log("productos");
								console.log(typeof products)
								console.log(products);
								console.log('res ->',res)
								setPdfSource(res);
							},(err)=>{
								console.log('error',err);
								setLoading(false);
								Alert.alert(`Ocurrio un error generando el documento, por favor intete luego`);
							});
							setProductsSend(products);
							setUserSend(user);
						}else{
							setLoading(false);
							Alert.alert('Verifica los datos!', 'El iva debe ser 0 o 12%.');
						}
					} else {
						setLoading(false);
						Alert.alert('Verifica los datos!', 'Si no es consumidor final el nit es requerido.');
					}
				} else {
					setLoading(false);
					Alert.alert('Verifica los datos!', 'Se debe seleccionar al menos un producto.');
				}
			} else {
				setLoading(false);
				Alert.alert('Verifica los datos!', 'El correo ingresado no tiene una forma valida.');
			}
		}
		else {
			setLoading(false);
			Alert.alert('Error obteniendo los datos de la sesion', 'Por favor, inicie sesion de nuevo.');
			Actions.login();
		}
	}

	const onClosePdf = ()=>{
		setPdfModalVisible(false);
		var query = `select * from dte where id=(select max(id) from dte)`;
		select(query,[],(ldoc)=>{
				setDocumento(ldoc);
		})
		var query = `select auth_number from dte where id=(select max(id) from dte)`;
		select(query,[],(ldoc)=>{
				setAutorizacion(ldoc);
		})
		setVisibleButton(true);
	}

	const onPrint = () => {

		console.log("entrada a onPrint");
		console.log(documento);
		setTimeout(()=>{
			// printer.print(JSON.stringify(documento),JSON.stringify(userSend),JSON.stringify(productsSend),nn.toString(),nombreComercial.toString(),direccionComercial.toString());
			printer.print(JSON.stringify(documento),JSON.stringify(userSend),JSON.stringify(productsSend),nnPrint.toString(),nombreComercialPrint.toString(),direccionComercialPrint.toString());
		},2000);
		// Actions.home();
	}

	const onGenerateE = ()=> {
		generateEmailString(userSend,autorizacion,email, (res)=>{
			console.log('res ->',res)
		},(err)=>{
			console.log('error',err);
			setLoading(false);
			Alert.alert(`Ocurrio un error enviando el documento por correo, por favor intete luego`);
		});
	}
	const nativeComponent = () => {
		activityStarter.navigateToExample(JSON.stringify(documento),JSON.stringify(user),JSON.stringify(products));
		const eventEmitter = new NativeEventEmitter(eventEmitterModule);
		eventEmitter.addListener(eventEmitterModule.MyEventName, (params) => {
			onGenerate();
			console.log(params);
			console.log(payment);
			eventEmitter.removeListener();
		})

	}



	return(
		// <ImageBackground source={require('../img/Fondo.png')} style={{width: '100%', height: '100%'}} >
			<ScrollView style={{backgroundColor:'white'}}>
				<View style={styles.container}>
					<IosHeader textHeader={'DTE'}/>
					<Modal visible={clientModalVisible}>
						<TouchableOpacity  onPress={()=>setClientModalVisible(false)} style={styles.closeModalButton}>
							<Icon
								name="keyboard-arrow-left"
								color="black"
								size={50}
								style={styles.icon}
							/>
						</TouchableOpacity>
						<Clients action='select' onSelect={onClientSelect}></Clients>
						<TouchableOpacity  onPress={()=>createClient(false)} style={styles.createModalButton}>
							<Icon
								name="add-circle"
                color={colorPalette.rgbColor}
                size={50}
                style={styles.icon}
							/>
						</TouchableOpacity>
					</Modal>
					<Modal visible={createClientModalVisible}>
						<TouchableOpacity  onPress={()=>setCreateClientModalVisible(false)} style={styles.actionButton}>
							<Icon
								name="arrow-back"
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >CERRAR</Text>
						</TouchableOpacity>
						<Client action='create' onSelect={onClientSelect}></Client>
					</Modal>
					<Modal visible={productModalVisible}>
						<TouchableOpacity  onPress={()=>setProductModalVisible(false)} style={styles.closeModalButton}>
							<Icon
                name="keyboard-arrow-left"
                color="black"
								size={50}
								style={styles.icon}
              />
						</TouchableOpacity>
						<Products action='select' onSelect={onProductSelect}></Products>


						<TouchableOpacity  onPress={()=>createProduct()} style={styles.createModalButton}>
							<Icon
                name="add-circle"
                color={colorPalette.rgbColor}
                size={50}
                style={styles.icon}
              />
						</TouchableOpacity>


					</Modal>
					<Modal visible={createProductModalVisible}>
						<TouchableOpacity  onPress={()=>setCreateProductModalVisible(false)} style={styles.closeModalButton}>
							<Icon
                name="keyboard-arrow-left"
                color="black"
								size={50}
								style={styles.icon}
              />
						</TouchableOpacity>
						<Product action='create' onSelect={onProductSelect}></Product>
					</Modal>
					<Modal visible={pdfModalVisible}>
						<TouchableOpacity  onPress={()=>onClosePdf()} style={styles.closeModalButton}>
							<Icon
								name="keyboard-arrow-left"
								color="black"
								size={50}
								style={styles.icon}
							/>
						</TouchableOpacity>
						<PdfView source={pdfSource}/>
						{/* <Button title='Cerrar Modal' onPress={()=>setPdfModalVisible(false)}></Button> */}
					</Modal>
					<View style={{width:'100%',alignItems:'center'}}>
						<SectionDivider width={'50%'} sectionName={'DATOS DEL CLIENTE'} />
					</View>

					<View style={styles.contentContainer}>
						<View style={styles.cfContainer}>
							<RadioForm
								radio_props={radioProps}
								formHorizontal={true}
								initial={0}
								buttonColor={colorPalette.color}
								onPress={(value) => {setCf(value)}}
								/>
						</View>

						<View style={{alignItems:'center'}}>


							<View style={styles.nitContainer}>
								{/* Fila 1: nit y boton */}
								{/* Dos columnas */}
								{(!cf) && (
										<TextInput
											placeholder="Nit"
											value={client.name}
											style={styles.nitInput}
											onChangeText={(e)=>{findClient(e)}}
										/>
								)}
								{(!cf) && (
									<TouchableOpacity
										onPress={()=>setClientModalVisible(true)}
										style={styles.clientListButton}
									>
										<Icon
											name="description"
											color="black"
											size={20}
											style={styles.listIcon}
										/>
										<Text fonSize={10} style={styles.fontSize}>Lista de clientes</Text>
									</TouchableOpacity>
								)}
							</View>



						</View>

						{/* <View > */}
						<View style={{width:'100%',height:'30%',marginTop:'5%', alignItems:'center'}}>
							{/* Fila 3: email */}
							<TextInput
								placeholder="Email"
								placeholderTextColor="black"
								onChangeText={(e)=>{setEmail(e)}}
								value={email}
								style={styles.inputBorder}
							/>
						</View>
						{/* </View> */}
					</View>
					<View style={{width:'100%',alignItems:'center',marginBottom:10}}>
						<SectionDivider width={'80%'} sectionName={'IVA 12 %'}/>
					</View>


					{/* <View style={styles.ivaContainer}> */}
							{/* <RadioForm
								radio_props={radioIVA}
								formHorizontal={true}
								initial={0}
								buttonColor={'#26A657'}
								onPress={(value) => {setIva(value)}}
							/> */}
						{/* <TextInput
							// placeholder="IVA"
							onChangeText={(e)=>{setIva(e)}}
							value={String(iva)}
							style={styles.inputBorder}
							keyboardType = 'decimal-pad'
						/> */}
						{/* <Picker
							style={{width:'80%'}}
							selectedValue={iva}
							onValueChange={(value, i) =>
								setIva(value)
							}
						>
							<Picker.item label='Excento' value={0}/>
							<Picker.item label='12%' value={12}/>
						</Picker> */}
					{/* </View> */}
					<View style={{width:'100%',alignItems:'center'}}>
						<SectionDivider width={'80%'} sectionName={'TIPO DE PAGO'}/>
					</View>
					<View style={styles.contentContainer}>
						<View style={styles.cfContainer}>
							<RadioForm
								radio_props={radioPaymentType}
								formHorizontal={true}
								initial={0}
								buttonColor={colorPalette.color}
								onPress={(value) => {setPayment(value)}}
								/>
						</View>
					</View>







					<View style={{width:'100%',alignItems:'center'}}>
						<SectionDivider width={'80%'} sectionName={'ESTABLECIMIENTO'}/>
					</View>

					<View style={[styles.inputContainer, styles.input]}>
	  				<Picker
	  					style={styles.selectInput}
	  					placeholder="Seleccionar Establecimiento"
	  					selectedValue={estNumber}
	  					onValueChange={(itemValue, itemIndex) => setEstNumber(itemValue)}
	  				>
	  					<Picker.Item label="" value={0} disabled={true} />
	  					{arrayNc.map((usr,i)=>{
	              var stringname = usr.toString().trim();
	              while (stringname.substring(0,1) == "<" || (stringname.substring(0,1) >='0' && stringname.substring(0,1) <='9')) {
	                stringname = stringname.substring(1);
	              }
	  						var st = `${usr.toString()}`;
	  						var num = `${usr.toString()}`;
	  							return(
	  									<Picker.Item label= {stringname} value={i} />
	  							)
	  					})}
	  				</Picker>
	  			</View>









					<View style={{width:'100%',alignItems:'center'}}>
						<SectionDivider width={'80%'} sectionName={'PRODUCTOS O SERVICIOS'}/>
					</View>

					<View style={styles.contentContainer}>
						<View style={{alignItems:'center'}}>


						{/*

						{!visibleUniqueProduct &&
						<TouchableOpacity
							style={styles.addProductContainer}
							onPress={onUniqueProduct}
						>
							<Text>Agregar producto unico</Text>
							<Icon
								name="add-circle"
								color={colorPalette.color}
								size={30}
								style={styles.addButtoIcon}
							/>
						</TouchableOpacity>

						}


							{visibleUniqueProduct &&
								<TextInput
									onChangeText={(e)=>{setNombreUniqueProduct(e)}}
									placeholder="Nombre Producto"
									placeholderTextColor="black"
									style={styles.inputBorder}
								/>
							}

							{visibleUniqueProduct &&
								<TextInput
									onChangeText={(e)=>{setPrecioUniqueProduct(e)}}
									placeholder="Precio Unitario"
									placeholderTextColor="black"
									style={styles.inputBorder}
									keyboardType = 'numeric'
								/>
							}

							{visibleUniqueProduct &&
								<TextInput
									onChangeText={(e)=>{setCantidadUniqueProduct(e)}}
									placeholder="Cantidad"
									placeholderTextColor="black"
									style={styles.inputBorder}
									keyboardType = 'numeric'
								/>
							}


						{visibleUniqueProduct &&
							<TouchableOpacity
								onPress={onUniqueProductAdd}
								style={styles.actionButton}>
								<Icon
									name="add"
									color={colorPalette.color}
									size={50}
									style={styles.icon}
								/>
								<Text >Agregar</Text>
							</TouchableOpacity>
						}

						*/}





							<TouchableOpacity
								style={styles.addProductContainer}
								onPress={() => setProductModalVisible(true)}
							>
								<Text>Agregar producto</Text>
								<Icon
									name="add-circle"
									color={colorPalette.color}
									size={30}
									style={styles.addButtoIcon}
								/>
							</TouchableOpacity>
						</View>
						<View>
							{/* Products */}
							{
								products.map((product)=>{
									return (<ProductBox product={product} action='item' onRemove={onProductRemove}></ProductBox>)
								})
							}
						</View>
						<View style={{width:'100%',alignItems:'center'}}>
							<View style={styles.totalContainers}>
								<Text>Sub Total: {subTotal}</Text>
							</View>
							<View style={styles.totalContainers}>
								<Text>Total: {total}</Text>
							</View>
						</View>
					{/* <Button title='Buscar Productos' onPress={()=>setProductModalVisible(true)}></Button> */}
					</View>

					{ (loading) && (
						<ActivityIndicator visible={false} size='large' color={colorPalette.color}/>
					)}
					<View style={styles.generateBillButtonContainer}>
						<TouchableOpacity onPress={onGenerate} style={styles.actionButton}>
							<Icon
								name="add"
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >Generar Factura</Text>
						</TouchableOpacity>
					</View>

					{/*<Button
	        	onPress={nativeComponent}
	        	title='Start example activity'
        	/>*/}

					<View style={styles.generateBillButtonContainer}>
					{visibleButton &&
						<TouchableOpacity
							onPress={onPrint}
							style={styles.actionButton}>
							<Icon
								name="add"
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >Imprimir Factura</Text>
						</TouchableOpacity>
					}
					</View>
					<View style={styles.generateBillButtonContainer}>
					{visibleButton &&
						<TouchableOpacity
							onPress={onGenerateE}
							style={styles.actionButton}>
							<Icon
								name="add"
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >Mandar Factura por Correo</Text>
						</TouchableOpacity>
					}
					</View>
				</View>
			</ScrollView>
		// </ImageBackground>
	);
}

const styles = StyleSheet.create({
	inputContainer:{
		marginLeft: 50,
		flexDirection:'column',
		justifyContent: 'center',
		// justifyContent:'flex-end',
		width: '75%',
		flex: 1,
		// paddingLeft: 10,
		// paddingRight: 10,
		paddingTop: 10,
		// paddingBottom: 20,
	},
	input: {
		justifyContent: 'center',
		borderBottomColor:'#828B95',
		borderBottomWidth:1
	},
	selectInput: {
		fontSize: 10
  },
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	javaBtn: {
		height: 50,
		width: 100,
		backgroundColor: 'yellow'
	},
	createModalButton:{
		flexDirection:'row',
		justifyContent:'flex-end',
    alignItems:'center'
	},
	closeModalButton:{
		flexDirection:'row'
	},
	fontSize: {
		fontSize: 10
	},

	sectionHeader:{
		flex: 1,
		flexDirection:'row',
		height:'5%',
		width:'100%',
		// backgroundColor:'#26A657',
		// backgroundColor:'#26A657',
		backgroundColor:colorPalette.rgbColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cfContainer:{
		alignItems:'center'
	},
	contentContainer: {
		flex: 1,
		flexDirection:'column',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 20,
		paddingBottom: 20,
	},
	endConsumerSwitch: {
		marginBottom: 10
	},
	inputBorder: {
		width:"80%",
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1,
		textAlign:'center'
	},
	nitContainer: {
		flexDirection: 'row',
		width:'80%'
	},
	nitInput: {
		flex: 3,
		marginRight: 20,
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1,
	},
	clientListButton: {
		padding: 10,
		flex: 1.5,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	listIcon: {
		alignSelf: 'center'
	},
	addClientButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
	addClientButton: {
		width: '60%'
	},
	ivaContainer: {
		alignItems:'center',
		width:'100%',
		height:'10%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	addProductContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
		width:'80%',
		flex:2
	},
	totalContainers: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width:'80%'
	},
	addButtoIcon:{
		marginLeft: 10
	},
	generateBillButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20
	},
	generateBillButton: {
		width: '60%'
	},
	actionButton:{
		marginTop:5,
    flexDirection:'row',
    backgroundColor:'white',
    borderBottomColor:colorPalette.color,
    borderTopColor:colorPalette.color,
    borderBottomWidth:1,
    borderTopWidth:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Dte;
