import React, { useState, useEffect } from 'React';
import { Actions } from 'react-native-router-flux';
import useUser from './../utils/useUser';
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
    ActivityIndicator,
    Modal
}	from 'react-native';

/*
    Puesto que con hooks no hay manera de ejecutar algo antes de montar el componente (?)
    Se podria renderizar condicionalmente este componente, mientras que se verifica si hay una sesion en el storage.
    Por default, habra un loader con "Por favor espere", una vez que getUsers termine de traer la data, o se redirige o se muestra la pagina de inicio
*/

const Home = () => {



    const {logout} = useUser();
    const [menuVisible,setMenuVisible] = useState(false);
    const handlePress = (view)=>{
  		setMenuVisible(false);
  		switch(view){
  			case 'clients':Actions.clients({action:'manage'}); break;
  			case 'products':Actions.products({action:'manage'}); break;
  			case 'dte':Actions.dte(); break;
  			case 'dtes':Actions.dtes(); break;
        case 'dtessummary':Actions.dtessummary(); break;

  		}
    }


    const onMenu = ()=>{
        setMenuVisible(!menuVisible);
    }

    const onLogout = ()=>{
        setMenuVisible(false);
		logout();
		Actions.login();
	}

    return (
        <View style={styles.container}>
            <Modal transparent={true} style={styles.modal} visible={menuVisible}>
                <View style={styles.menuContainer}>
                    <View style={styles.menuHeaderContainer}>
                        <Image
                            style={styles.menuLogo}
                            source={require('../img/logo.png')}
                        />
                        <TouchableOpacity style={styles.primaryGray} onPress={()=>{setMenuVisible(false)}}>
                            <Icon
                                name="keyboard-arrow-left"
                                color="black"
                                size={50}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuBodyContainer}>
                        <TouchableOpacity onPress={()=>handlePress('clients')} style={styles.menuTouch}>
                            <Text style={styles.menuText}>Clientes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handlePress('products')} style={styles.menuTouch}>
                            <Text style={styles.menuText}>Productos</Text>
                        </TouchableOpacity>
                        <View style={styles.menuLine}></View>
                        <TouchableOpacity onPress={()=>onLogout()} style={styles.menuTouch}>
                            <Text style={styles.menuText}>Cerrar Sesion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../img/logo.png')}
                />
                <TouchableOpacity onPress={onMenu}>
                    <Icon
                        name="view-list"
                        color="black"
                        size={50}
                        style={styles.headerIcon}
                    />
				</TouchableOpacity>

            </View>
            <ImageBackground source={require('../img/home-background.jpg')} style={styles.body}>

                <TouchableOpacity onPress={()=>handlePress('dte')} style={styles.sectionTouch}>
					<Text style={styles.sectionTouchText}>Generar Factura</Text>
				</TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress('dtes')} style={styles.sectionTouch}>
					<Text style={styles.sectionTouchText}>Facturas Emitidas</Text>
				</TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress('products')} style={styles.sectionTouch}>
					<Text style={styles.sectionTouchText}>Mis Productos</Text>
				</TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress('clients')} style={styles.sectionTouch}>
					<Text style={styles.sectionTouchText}>Mis Clientes</Text>
				</TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress('dtessummary')} style={styles.sectionTouch}>
          <Text style={styles.sectionTouchText}>Resumen de Facturas</Text>
        </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header:{
        backgroundColor: 'white',
        width: '100%',
        height: '15%',
        //  height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    modal:{
        flex:1,
        flexDirection:'column'
    },
    menuContainer:{
        width:'100%',
        //width:'70%',
        height:'25%',
        //height:'50%',
        backgroundColor:'white'
    },
    menuHeaderContainer:{
        width:'100%',
        height:'25%',
        flexDirection:'row'
    },
    menuBodyContainer:{
        width:'100%',
        height:'75%',
        flexDirection:'column',
        backgroundColor:'rgb(119,211,83)',
        justifyContent: 'space-around'
    },
    menuLine:{
        height:'1%',
        backgroundColor:'white'
    },
    menuLogo:{
        marginLeft:'10%',
        width:'80%',
        height:'100%'
				//width: wp('30%'),//80
        //height: hp('20%'),//
    },
    menuText:{
        fontSize:20,
        color:'white',
        marginLeft:'5%'
        //marginLeft:'10%'
    },
    primaryGray:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    menuTouch:{
        justifyContent:'center'
    },
    body:{
        flexDirection: 'column',
        width:'100%',
        height:'100%',
				//alignItems:'center',

				//justifyContent:'center',
    },
    logo:{
      width: '70%',
        height: '60%'
        //width: wp('30%'),
        //height: hp('20%'),
    },
    headerIcon:{
        marginRight: '2%'
    },
    sectionTouch:{
        marginTop:'3%',
        backgroundColor:'rgba(119,211,83,0.5)',
        width:'100%',
        height:'15%',
				//width: wp('100%'),
				//height: hp('12%'),

        flexDirection:'row',
        alignItems:'center',

				justifyContent:'center',
    },
    sectionTouchText:{
      marginTop:'3%',
        marginLeft:'5%',
        fontSize:15,
        color:'white'
        //marginTop:'1%',
        //marginLeft:'10%',
        //fontSize: hp('4%'),
        //color:'white'
    }

});



export default Home;
