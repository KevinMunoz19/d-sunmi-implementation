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

const Init = () => {
  const [loading,setLoading] = useState(true);
  const { getUser } = useUser();

  useEffect(()=>{
		getUser((users)=>{
	    if(users == null){
	      console.log('no user');
	      setLoading(false);
	    }else if(users.contact_name == null){
	      Actions.firstTimeForm();
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
          <View style={styles.imageContainer}>
            <Image
            	style={styles.image}
            	source={require('../img/logo.png')}
            />
          </View>
          <ImageBackground style={styles.bodyContainer} source={require('../img/init-background.jpg')}>
            <TouchableOpacity style={styles.sendButton} onPress={() => Actions.login()}>
              <Text style={{color:'white',textAlign:'center',fontSize:20}}>Ingresar a la aplicacion</Text>
            </TouchableOpacity>
            <View style={{height:'20%'}}></View>
          </ImageBackground>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
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
    width:'80%',
		height:'100%',
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
		//backgroundColor:'rgba(119,211,83,0.5)',
		backgroundColor:'rgba(234, 103, 46, 0.5)',
		width:'100%',
		height:'20%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
	}
});

export default Init;
