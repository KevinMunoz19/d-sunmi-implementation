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
	ActivityIndicator,
	ScrollView,
}	from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
			return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
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
		<ScrollView style={{backgroundColor:'white',flex:1}}>
			<View style={loginStyles.primaryContainer}>
				<View style={loginStyles.headerContainer}>
				</View>
				<View style={loginStyles.imageContainer}>
					<Image source={require('../img/docutec_logo.jpeg')} style={loginStyles.logo}/>
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
					<ActivityIndicator visible={false} size='large' color='#f06f17'/>
				)}
				<View style={loginStyles.buttonContainer}>
					<TouchableOpacity style={loginStyles.button} onPress={handlerSend}>
						<Text style={loginStyles.buttonText}>INICIAR SESION</Text>
					</TouchableOpacity>
				</View>

				<View style={loginStyles.headerContainer}>
					<View style={loginStyles.textHeaderContainer}>
						<Text style={loginStyles.textHeader}>Powered By</Text>
					</View>
				</View>

				<View style={loginStyles.imageContainerSub}>
					<Image source={require('../img/logo.png')} style={loginStyles.logoSub}/>
				</View>



			</View>
		</ScrollView>
	);
}
const loginStyles = StyleSheet.create({
	primaryContainer:{
		flex:1,
		backgroundColor:'white'
	},
	headerContainer:{
		flex:0.5,
		backgroundColor:'rgb(234, 103, 46)'
	},
	imageContainer:{
		flex:2,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center'
	},
	logo:{
		//width:'50%',
		//height:'20%',
		width: wp('70%'),
		height: hp('15%'),
	},
	formContainer:{
		flex:3,
		backgroundColor:'white',
		alignItems:'center',
		justifyContent:'space-around',
		height: hp('40%'),
	},
	buttonContainer:{
		flex:2,
		backgroundColor:'white',
		alignItems:'center',
		marginBottom:20,
	},
	inputContainer:{
		// paddingTop:'2%',
		width: wp('70%'),
		// width:'70%',
		textAlign:'center',
		flexDirection:'row',
		alignItems:'center',
		borderBottomColor:'rgb(234, 103, 46)',
		borderBottomWidth:1,
	},
	input:{
		// width:'100%',
		width: wp('100%')
	},
	button:{
		width:'50%',
		height:'90%',
		// width:'60%',
		// height:'30%',
		backgroundColor:'#828B95',
		alignItems:'center',
		justifyContent:'center'
	},
	buttonText:{
		color:'white',
		fontSize:20,
	},
	textHeader:{
    color:'black',
    fontSize:15,
		fontWeight: 'bold',
  },
  textHeaderContainer:{
    width:'50%',
    height:'50%',
    backgroundColor:'rgb(255, 255, 255)',
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
	imageContainerSub:{
		flex:2,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center'
	},
	logoSub:{
		//width:'50%',
		//height:'20%',
		width: wp('40%'),
		height: hp('10%'),
	},
});
//
	// const styles = StyleSheet.create({
	// container:{
	// 	flex: 1,
	// 	flexDirection:'column',
	//   alignItems: 'center',
	// 	justifyContent: 'flex-start',
	// },
	// input:{
	// 	textAlign: 'center',
	// 	width:'80%',
	// 	marginTop:'5%',
	// 	marginBottom:'5%',
	// 	backgroundColor : 'rgb(235, 235, 235)',
	// 	borderRadius:9,
	// 	shadowOpacity: 0.75,
	//   shadowRadius: 5,
	//   shadowColor: 'red',
	//   shadowOffset: { height: 0, width: 0 }
	// },
	// logo:{
	// 	width:'80%',
	// 	height:'20%',
	// 	resizeMode: 'contain',
	// },
	// sendButton:{
	// 	backgroundColor:'#f06f17',
	// 	width:'40%',
	// 	height:'15%',
	// 	textAlign: 'center',
	// 	justifyContent: 'center',
	// 	borderRadius:9
	// },
	// })

export default Login;
