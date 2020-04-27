import React, {Fragment,useState,useEffect} from 'react';
import {
	Text,
	View,
	TextInput,
	Button,
	Alert,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	BackHandler,
	ActivityIndicator
}	from 'react-native';
import useClientForm from '../utils/useClientForm'
import Icon from "react-native-vector-icons/MaterialIcons";
import useApi from '../utils/useApi';
import {Actions} from 'react-native-router-flux';
import IosHeader from '../components/IosHeader';

const Client = ({id,client,action,onSelect}) =>{
	const {inputs,setInputs, handleInputChange, handleSubmit} = useClientForm();
	const {validateNit, getRequestor, getInfo} = useApi();
	const [nit,setNit] = useState();
	const [isNit,setIsNit]=useState(false);
	const [loading,setLoading]=useState(false);
	const [kValue,setKValue] = useState(false);
	const [requestor,setRequestor] = useState('');
	const [taxId,setTaxId] = useState('');
	const [calle,setCalle] = useState('');
	const [direccion,setDireccion] = useState('');
	const [colonia,setColonia] = useState('');
	const [zona,setZona] = useState('');
	const [frases,setFrases] = useState('');
	const [afiliacion,setAfiliacion] = useState('');
	const [nn,setNn] = useState('');

	BackHandler.addEventListener('hardwareBackPress', function() {
		Actions.home();
		return true;
	});

	useEffect(() => {
		if(action == 'edit'){
			client.zipCode = client.zip_code;
			setInputs(client);
		}else if (false){
			handleInputChange('nit',nit);
		}
	}, [])

	const changeNit = (nit) =>{
		handleInputChange('nit',nit);
		setNit(nit);
	}

	const changeNitK = (nit) =>{
		newnitk = nit+'K';
		handleInputChange('nit',newnitk);
		setNit(newnitk);
	}

	const searchNit = ()=>{
		if (kValue==true){
			if (nit.substr(nit.length -1) != "K")
			setNit(nit.concat('K'));
		}else if (kValue==false) {
			if (nit.substr(nit.length -1) == "K"){
				setNit(nit.substring(0, nit.length - 1));
			}
		}
		console.log("entrada a search nit");
		console.log(nit);
		setLoading(true);
		validateNit(nit,(name)=>{
			setLoading(false);
			handleInputChange('name',name.toString());
			setIsNit(true);
		},(err)=>{
			handleInputChange('name',err);
			if(err==200){
				Alert.alert('Error de conexion');
			}else{
				Alert.alert(err);
			}
			setLoading(false);
		});
	}

	const defaultValues = ()=>{
		handleInputChange('address','Ciudad');
		handleInputChange('zipCode','01010');
		handleInputChange('municipality','Guatemala');
		handleInputChange('department','Guatemala');
	};


	return(
		// <ImageBackground source={require('../img/Fondo.png')} style={{width: '100%', height: '100%'}} >
			<ScrollView style={{backgroundColor:'white',flex:1}}>
				{(onSelect==null) && (
					<IosHeader textHeader={'DTE'}/>
				)}
				<View style={{
						height:80,
						justifyContent:'flex-end',
						alignItems:'center'
					}}>
						<View style={{
							backgroundColor:'rgb(234, 103, 46)',
							width:'50%',
							height:'50%',
							justifyContent:'center',
							alignItems:'center'
						}}>
							<Text style={{
								color:'white',
								fontSize:20
							}}
							>
								Cliente
							</Text>
						</View>
				</View>
				<View>
					<View style={styles.inputContainer}>
						<Text>Nit</Text>
						<TextInput
							onChangeText={(e)=>{changeNit(e)}}
							onBlur={searchNit}
							//value={`${inputs.nit | '' }`}
							value={inputs.nit}
							style={styles.input}
							keyboardType = 'numeric'
						/>
						{/*
							{!kValue &&
							<TouchableOpacity
								//onPress={()=>setKValue(true)}
								onPress={()=>changeNitK(nit)}
								style={styles.clientListButton}
							>
								<Icon
									name="description"
									color="black"
									size={20}
									style={styles.listIcon}
								/>
								<Text fonSize={10} style={styles.fontSize}>Agregar K</Text>
							</TouchableOpacity>
						}
					*/}
					<TouchableOpacity
						onPress={()=>defaultValues()}
						style={styles.clientListButton}
					>
						<Icon
							name="description"
							color="black"
							size={20}
							style={styles.listIcon}
						/>
						<Text fonSize={10} style={styles.fontSize}>Llenar Formulario</Text>
					</TouchableOpacity>
						{kValue &&
						<TouchableOpacity
							onPress={()=>setKValue(false)}
							style={styles.clientListButton}
						>
							<Icon
								name="description"
								color="black"
								size={20}
								style={styles.listIcon}
							/>
							<Text fonSize={10} style={styles.fontSize}>Quitar K</Text>
						</TouchableOpacity>
					}
					</View>
					{(loading)&&(
						<ActivityIndicator visible={false} size='large' color='#f06f17'/>
					)}
					<View style={styles.inputContainer}>
						<Text>Nombre</Text>
						<TextInput
							editable={false}
							onChangeText={(e)=>{handleInputChange('name',e)}}
							value={inputs.name}
							style={styles.input}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text>Correo</Text>
						<TextInput
							onChangeText={(e)=>{handleInputChange('email',e)}}
							value={inputs.email}
							style={styles.input}
							keyboardType = 'email-address'
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text>Direccion</Text>
						<TextInput
							onChangeText={(e)=>{handleInputChange('address',e)}}
							value={inputs.address}
							style={styles.input}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text>Codigo Postal</Text>
						<TextInput
							onChangeText={(e)=>{handleInputChange('zipCode',e)}}
							value={inputs.zipCode}
							style={styles.input}
							keyboardType = 'numeric'
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text>Municipio</Text>
						<TextInput
							onChangeText={(e)=>{handleInputChange('municipality',e)}}
							value={inputs.municipality}
							style={styles.input}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text>Departamento</Text>
						<TextInput
							onChangeText={(e)=>{handleInputChange('department',e)}}
							value={inputs.department}
							style={styles.input}
						/>
					</View>
					{(action == 'edit') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'edit'})} style={styles.actionButton}>
							<Icon
								name="edit"
								color="#f06f17"
								size={50}
								style={styles.icon}
							/>
							<Text >EDITAR</Text>
						</TouchableOpacity>
					)}
					{(action == 'edit') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'delete'})} style={styles.actionButton}>
							<Icon
								name="delete-forever"
								color="#f53d3d"
								size={50}
								style={styles.icon}
							/>
							<Text >ELIMINAR</Text>
						</TouchableOpacity>
					)}
					{(action == 'create') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'create',onSelect:onSelect})} style={styles.actionButton}>
							<Icon
								name="add"
								color="#f06f17"
								size={50}
								style={styles.icon}
							/>
							<Text >REGISTRAR</Text>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		// </ImageBackground>
	);
}

const styles = StyleSheet.create({
    inputContainer:{
		paddingTop:'4%',
		paddingLeft:'9%',
		paddingRight:'9%',
		textAlign:'center',
	},
	input:{
		borderBottomColor:'#DDD',
		borderBottomWidth:1
	},
	touchContainer:{
		height:50
	},
	actionButton:{
		backgroundColor:'black',
		marginTop:5,
    flexDirection:'row',
    backgroundColor:'white',
    borderBottomColor:'#f06f17',
    borderTopColor:'#f06f17',
    borderBottomWidth:1,
    borderTopWidth:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default Client;
