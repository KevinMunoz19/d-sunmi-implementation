import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
	View,
	TextInput,
	Button,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	Alert,
	ActivityIndicator
}	from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from 'react-native-router-flux';
import useUser from './../utils/useUser';
import useApi from './../utils/useApi';
const Login = () =>{

	const [nit,setNit] = useState('');
	const [username,setUsername] = useState('');
	const [password,setPassword] = useState('');
	const {setUser,getUser} = useUser();
	const {login} = useApi();
	const [loading,setLoading] = useState(false);

	useEffect(()=>{
		getUser((users)=>{
			console.log('user',users);
			if(users != null){
				Actions.home();
			}
		})
	},[])
	
	function handlerSend(){
		setLoading(true);
		function PadLeft(value, length) {
			return (value.toString().length < length) ? PadLeft("0" + value, length) : 
			value;
		}

		login({
			Username:`GT.${PadLeft(nit,12)}.${username}`,
			Password:password
		},(response)=>{
			if(response!=null){
				if(response.code == null){
					console.log(response);
					var user = {
						name:username,
						nit:nit,
						stringNit:response.otorgado_a,
						token:response.Token
					}
					setUser(user,(userInfo)=>{
						setLoading(false);
						console.log('aqui el que necesito',userInfo);
						console.log(userInfo.contact_name);
						if(userInfo.contact_name == null){
							Actions.welcome();
						}else if(userInfo.confirm_contract == null){
							Actions.contract();
						}else{
							Actions.home();
						}
					});
					
				}else{
					setLoading(false);
					if(response.code == 2001){
						Alert.alert('Usuario o Clave invalida');
					}else{
						Alert.alert(response.message);
					}
					
				}
			}
		},(err)=>{
			setLoading(false);
			console.log(err);
			Alert.alert(`Error de la peticion -> ${err}`);
		});
	}


	return(
		// <ImageBackground source={require('../img/Fondo.png')} style={{width: '100%', height: '100%'}} >
		// 	<View style={styles.container}>
		// 		<Image source={require('../img/logo.png')} style={styles.logo}/>
				
		// 		<TextInput style = {styles.input}
		// 			placeholder="Nit"
		// 			onChangeText={(e)=>{setNit(e)}}
		// 		/>
		// 		<TextInput style = {styles.input}
		// 			placeholder="Username "
		// 			onChangeText={(e)=>{setUsername(e)}}
		// 		/>
		// 		<TextInput style = {styles.input}
		// 			placeholder="Password"
		// 			onChangeText={(e)=>{setPassword(e)}}
		// 			secureTextEntry={true}
		// 		/>
		// 		{(loading)&&(
		// 			<ActivityIndicator visible={false} size='large' color='#26A657'/>
		// 		)}
		// 		<TouchableOpacity style={styles.sendButton}	onPress={handlerSend}>
		// 			<Text style={{color:'white',textAlign:'center'}}>Login</Text>
		// 		</TouchableOpacity>
		// 	</View>
		// </ImageBackground >
		<View style={loginStyles.primaryContainer}>
			<View style={loginStyles.headerContainer}>
			
			</View>
			<View style={loginStyles.imageContainer}>
				
				<Image source={require('../img/logo.png')} style={loginStyles.logo}/>
			</View>
			<View style={loginStyles.formContainer}>
				<View style={loginStyles.inputContainer}>
					<Icon
						name="fingerprint"
						color="#828B95"
						size={20}/>
					<TextInput
						placeholder='NIT'
						style={loginStyles.input}
						onChangeText={(e)=>{setNit(e)}}
					/>
				</View>
				<View style={loginStyles.inputContainer}>
					<Icon
						name="person-pin"
						color="#828B95"
						size={20}/>
					<TextInput
						placeholder='USUARIO'
						style={loginStyles.input}
						onChangeText={(e)=>{setUsername(e)}}
					/>
				</View>
				<View style={loginStyles.inputContainer}>
					{/* <View style={{flexDirection:'row',alignItems:'center'}}> */}
						<Icon
							name="lock"
							color="#828B95"
							size={20}
						/>
						<TextInput
							placeholder='CLAVE'
							style={loginStyles.input}
							onChangeText={(e)=>{setPassword(e)}}
							secureTextEntry={true}
						/>
					{/* </View> */}
					
				</View>
			</View>
			{(loading)&&(
				<ActivityIndicator visible={false} size='large' color='#26A657'/>
			)}
			<View style={loginStyles.buttonContainer}>
				<TouchableOpacity style={loginStyles.button} onPress={handlerSend}>
					<Text style={loginStyles.buttonText}>INICIAR SESION</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
const loginStyles = StyleSheet.create({
	primaryContainer:{
		flex:1,
		backgroundColor:'white'
	},
	headerContainer:{
		flex:0.5,
		backgroundColor:'rgb(119,211,83)'
	},
	imageContainer:{
		flex:2,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center'
	},
	logo:{
		width:'100%',
		height:'60%'
	},
	formContainer:{
		flex:3,
		backgroundColor:'white',
		alignItems:'center',
		justifyContent:'space-around'
	},
	buttonContainer:{
		flex:2,
		backgroundColor:'white',
		alignItems:'center'
	},
	inputContainer:{
		paddingTop:'4%',
		width:'70%',
		textAlign:'center',
		flexDirection:'row',
		alignItems:'center',
		borderBottomColor:'rgb(119,211,83)',
		borderBottomWidth:1,
	},
	input:{
		
		width:'100%'
	},
	button:{
		width:'60%',
		height:'30%',
		backgroundColor:'#828B95',
		alignItems:'center',
		justifyContent:'center'
	},
	buttonText:{
		color:'white',
		fontSize:20
	}

})
//
const styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection:'column',
        alignItems: 'center',
		justifyContent: 'flex-start',
	},
	input:{
		textAlign: 'center',
		width:'80%',
		marginTop:'5%',
		marginBottom:'5%',
		backgroundColor : 'rgb(235, 235, 235)',
		borderRadius:9,
		shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 }
	},
	logo:{
		width:'80%',
		height:'20%',
		resizeMode: 'contain',
	},
	sendButton:{
		backgroundColor:'#26A657',
		width:'40%',
		height:'5%',
		textAlign: 'center',
		justifyContent: 'center',
		borderRadius:9
	},
	
 })

export default Login;