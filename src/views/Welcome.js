import React, { useState, useEffect } from 'React';
import { Actions } from 'react-native-router-flux';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
	ActivityIndicator
}	from 'react-native';
import useUser from './../utils/useUser';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

/*
    Puesto que con hooks no hay manera de ejecutar algo antes de montar el componente (?)
    Se podria renderizar condicionalmente este componente, mientras que se verifica si hay una sesion en el storage.
    Por default, habra un loader con "Por favor espere", una vez que getUsers termine de traer la data, o se redirige o se muestra la pagina de inicio
*/

const Welcome = () => {
    const [loading,setLoading] = useState(true);
    const { getUser } = useUser();

    useEffect(()=>{
		getUser((users)=>{
            if(users == null){
                Actions.login();
            }else if(users.contact_name == null){
                setLoading(false);
            }else if(users.confirm_contract == null){
                Actions.contract();
            }else{
                Actions.home();
            }
        });
	});

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator visible={false} size='large' color='#f06f17'/>
                    <Text>Cargando...</Text>
                </View>
            )}
            {!loading && (
                <React.Fragment>
                    <View style={styles.imageContainerN}>
                        <Image
                            style={styles.logoN}
                            source={require('../img/docutec_logo.jpeg')}
                        />
                    </View>
                    <View style={styles.messageSectionContainer}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Bienvenido a facturacion {"\n"}electronica</Text>
                            <Text style={styles.subMessageText}>{"\n"}Para comenzar es necesario que {"\n"}configuremos tu cuenta.</Text>
                        </View>
                    </View>
                    <View style={styles.imageFelContainer}>
                        <Image
                            style={styles.image}
                            source={require('../img/fel.jpg')}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=>Actions.firstTimeForm()}>
                            <Text style={styles.buttonText}>COMENZAR</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
	imageContainerN:{
		flex:2,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center'
	},
	logoN:{
		//width:'50%',
		//height:'20%',
		width: wp('70%'),
		height: hp('15%'),
	},
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    button:{
		width:'50%',
		height:'30%',
		backgroundColor:'#828B95',
		alignItems:'center',
		justifyContent:'center'
	},
	buttonText:{
		color:'white',
		fontSize:20
	},
    messageText:{
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    subMessageText:{
        color:'white',
        fontSize:12,
        textAlign:'center'
    },
    messageContainer:{
        backgroundColor:'rgba(234, 103, 46, 0.5)',
        width:'80%',
        height:'85%',
        alignItems:'center',
        justifyContent:'center'
    },
    messageSectionContainer:{
        flex:3,
        alignItems:'center'
    },
    buttonContainer:{
        flex:1
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 2,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    imageFelContainer: {
        flex: 1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    image: {
        // borderWidth: 2,
        // borderColor: 'yellow',
        width:'90%',
		height:'90%',
		resizeMode: 'contain'
    },
    bodyContainer:{
        flex:4,
        justifyContent:'flex-end'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    sendButton:{
		backgroundColor:'rgba(234, 103, 46, 0.5)',
		width:'100%',
		height:'20%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
	}
});

export default Welcome;
