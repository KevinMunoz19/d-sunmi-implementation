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


const Dte = () =>{
	const [cf,setCf] = useState(false);
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
	const {generateTotals,generateString} = useDte();
	const {getUser} = useUser();
	const [user,setUser] = useState();
	const {findByNit} = useClientForm();
	const [isNit,setIsNit] = useState(false);
	const [pdfSource,setPdfSource] = useState(null);
	const [loading,setLoading] = useState(false);

	const {select} = DB();

	//const {getLastDte} = useLastDte();
	const [documento,setDocumento] = useState([]);

	//const [dteList,setDteList] = useState([]);

	const {getBill} = useApi();





	const radioProps = [
		{label: 'Nit  ', value: false },
		{label: 'Consumidor Final	', value: true }
	];

	const radioIVA = [
		{label:'12%  ',value:12},
		{label:'Exento',value:0}
	]



	useEffect(()=>{
			var query = `select * from dte where id=(select max(id) from dte)`;
			select(query,[],(ldoc)=>{
					setDocumento(ldoc);
			})
	})





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
			setUser(userInfo);
		})
	},[])

	useEffect(()=>{
		console.log('Cambio de user:', user);
	},[user])

	const onClientSelect = (client)=>{
		setTimeout(()=>{
			setClientModalVisible(false);
			setCreateClientModalVisible(false);
		},500)
		setEmail(client.email);
		setNit(client.nit);
		setClient(client);
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
	}

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
		if (user) {
			if (email.trim().length > 0 ? validateEmail(email) : true){
				if (products.length > 0) {
					if((!cf && client.nit.trim().length > 0) || cf) {
						if(iva == 0 || iva == 12){
							generateString(products,client,cf,iva,email,user,(res)=>{
								console.log('res ->',res)
								setPdfSource(res);
							},(err)=>{
								console.log('error',err);
								setLoading(false);
								Alert.alert(`Ocurrio un error generando el documento, por favor intete luego`);
							});
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

		//Actions.home();
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
						{/* <TouchableOpacity  onPress={()=>createClient(false)} style={styles.createModalButton}>
							<Icon
								name="add-circle"
                                color="rgb(119,211,83)"
                                size={50}
                                style={styles.icon}
							/>
						</TouchableOpacity> */}
					</Modal>

					<Modal visible={createClientModalVisible}>
						<TouchableOpacity  onPress={()=>setCreateClientModalVisible(false)} style={styles.actionButton}>
							<Icon
								name="arrow-back"
								color="#26A657"
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
						{/* <TouchableOpacity  onPress={()=>createProduct()} style={styles.createModalButton}>
							<Icon
                                name="add-circle"
                                color="rgb(119,211,83)"
                                size={50}
                                style={styles.icon}
                            />
						</TouchableOpacity> */}
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
								buttonColor={'#26A657'}
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
						<SectionDivider width={'80%'} sectionName={'PRODUCTOS O SERVICIOS'}/>
					</View>

					<View style={styles.contentContainer}>
						<View style={{alignItems:'center'}}>
							<TouchableOpacity
								style={styles.addProductContainer}
								onPress={() => setProductModalVisible(true)}
							>
								<Text>Agregar producto</Text>
								<Icon
									name="add-circle"
									color="#26A657"
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
						<ActivityIndicator visible={false} size='large' color='#26A657'/>
					)}
					<View style={styles.generateBillButtonContainer}>
						<TouchableOpacity onPress={onGenerate} style={styles.actionButton}>
							<Icon
								name="add"
								color="#26A657"
								size={50}
								style={styles.icon}
							/>
							<Text >Generar Factura</Text>
						</TouchableOpacity>
					</View>



					<View style={styles.generateBillButtonContainer}>
						<TouchableOpacity
						onPress={ () =>{
							//onGenerate
							Linking.openURL('app://digifact')
							//Linking.sendIntent('text':"hello world")

						}}
							style={styles.actionButton}>
							<Icon
								name="add"
								color="#26A657"
								size={50}
								style={styles.icon}
							/>
							<Text >Pago Con Tarjeta</Text>
						</TouchableOpacity>
					</View>


					<View>
						<Sw style = {styles.javaBtn} isTurnedOn={true} />
					</View>

					<View>
						<Button
							
            	onPress={() => printer.print(JSON.stringify(documento),JSON.stringify(user),JSON.stringify(products))}
            	title='Start example activity'
          	/>
					</View>

				</View>
			</ScrollView>
		// </ImageBackground>
	);
}

const styles = StyleSheet.create({
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
		backgroundColor:'#26A657',
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
		// borderColor: '#000',
		// borderWidth: 2
		// justifyContent: 'space-between',
		// borderBottomColor: '#DDDDDD',
		// borderBottomWidth: 1,
	},
	nitInput: {
		flex: 3,
		marginRight: 20,
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1,
		// width: 80

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
        borderBottomColor:'#26A657',
        borderTopColor:'#26A657',
        borderBottomWidth:1,
        borderTopWidth:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Dte;
