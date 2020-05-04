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
import Icon from "react-native-vector-icons/MaterialIcons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ContractMessage = () => {
  const [loading,setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const { getUser } = useUser();

  useEffect(()=>{
		getUser((users)=>{
      if(users == null){
        Actions.login();
        setLoading(false);
      // }else if(users.contact_name == null){
      //   Actions.firstTimeForm();
      // }else if(users.confirm_contract == null){
      //   Actions.contract();
      }else{
        setUser(users);
        setLoading(false);
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
          <View style={styles.iconContainer}>
            <Icon
	            name="check-circle"
	            color="rgb(234, 103, 46)"
	            size={80}
	            style={styles.icon}
            />
          </View>
          <View style={styles.messageSectionContainer}>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Bienvenido, {user!=null && user.contact_name} {"\n"}{"\n"}
              </Text>
              <Text style={styles.messageText}>
                Esta es la aplicacion movil{"\n"}
                que hara que tu factura sea  {"\n"}
                rapida, sencilla y sin contratiempos.
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>Actions.home()}>
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
  iconContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
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
    color:'#828B95',
    fontSize:20,
    textAlign:'center'
  },
  subMessageText:{
    color:'white',
    fontSize:12,
    textAlign:'center'
  },
  messageContainer:{
    width:'80%',
    height:'85%',
    alignItems:'center',
  },
  messageSectionContainer:{
    flex:2,
    alignItems:'center'
  },
  buttonContainer:{
    flex:2
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

export default ContractMessage;
