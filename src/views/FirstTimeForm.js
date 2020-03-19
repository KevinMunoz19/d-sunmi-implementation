import React, { useState } from 'react';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ImageBackground,
    ActivityIndicator,
    TextInput,
    ScrollView,
    Alert,
    Picker
}	from 'react-native';

import useUser from './../utils/useUser';
import { validateEmail } from '../utils/emailValidator';

const FirstTimeForm = () => {
    const {setUserInfo}  = useUser();
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        contactName: "DigifactApp",
        id: "123456",
        nation: "Guatemala",
        job: "null",
        certificate: "null",
        certificateName:"null",
        cellphone: '+ 502 12345678',
        email: 'digifactapp@gmail.com',
        logo: "null",
        logoName:"null"
    });

    const handleInputChange = (newValue, key) => {
        const objectCopy = formData;
        const newData = { ...objectCopy };
        newData[key] = newValue;
        setFormData(newData);
    };
    const submitForm = () => {
        setLoading(true);
        const { contactName, id, nation, job, certificate, cellphone, logo} = formData;
        if(formData.email.trim().length > 0 ? validateEmail(formData.email) : false) {
            if(contactName && id && nation && job && cellphone && logo && certificate) { //&& logo && certificate comentado para iphone
                setUserInfo(formData);
                setLoading(false);
                Actions.contract();
            } else {
                setLoading(false);
                Alert.alert('Verifica los datos!', 'Todos los campos son requeridos.');
            }

        } else {
            setLoading(false);
            Alert.alert('Verifica los datos!', 'El correo ingresado no tiene una forma valida.');
        }
    };

    const findLogo = ()=>{
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        ImagePicker.launchImageLibrary(options,(response) => {
            console.log('Response = ', response);
            console.warn(response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {

                var copy = formData;
                var newData = { ...copy };
                newData.logo = response.data;
                newData.logoName = response.fileName;
                setFormData(newData);
                Alert.alert('Logo seleccionado');
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
          });
    }

    const findCertificate = async ()=>{
        try {
            const res = await DocumentPicker.pick({
              //type: [DocumentPicker.types.allFiles],
							type: [DocumentPicker.types.images],
            });
            console.log('aca la respuesta completa->',res);
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );
            var extension = res.name.split(".");
            console.log(extension[extension.length-1]);
            if(extension[extension.length-1].toLowerCase() == "png".toLowerCase()){
						//if(extension[extension.length-1].toLowerCase() == "p12".toLowerCase()
                //|| extension[extension.length-1].toLowerCase() == "pfx".toLowerCase()
								//|| extension[extension.length-1].toLowerCase() == "txt".toLowerCase()
								//|| extension[extension.length-1].toLowerCase() == "png".toLowerCase()){
                    var copy = formData;
                    var newData = { ...copy };
                    newData.certificate = res.name;
                    newData.certificateName = res.name;
                    setFormData(newData);
                    Alert.alert('Certificado seleccionado');
            }else{
                Alert.alert('Formato de certificado incorrecto');
            }

          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }

  return (
  	<ScrollView style={styles.scrollContainer}>
    	<View style={styles.container}>
        <View style={styles.logoRow}>
        	<Image source={require('../img/logo.png')} style={styles.logo}/>
        </View>
        <View style={styles.formContainer}>
        	<View style={[styles.formLabel]}>
            {/* 1 columna, label de formulario  */}
            <Text style={{color: "#fff", fontSize: 20, padding: 3}}>Formulario</Text>
          </View>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
            	<TextInput
                placeholder="Nombre del contacto"
                onChangeText={(e)=>{handleInputChange(e, 'contactName')}}
                value={formData.contactName}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.inputHalfcontainer}>
              <TextInput
                placeholder="Identificacion"
                onChangeText={(e)=>{handleInputChange(e, 'id')}}
                value={formData.id}
                style={styles.input}
              />
            </View>
            <View style={styles.inputHalfcontainer}>
            	<TextInput
                placeholder="Celular"
                onChangeText={(e)=>{handleInputChange(e, 'cellphone')}}
                value={formData.cellphone}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.inputHalfcontainer}>
              <TextInput
                onFocus={findLogo}
                placeholder="Logo"
                value={formData.logoName}
                style={styles.input}
              />
            </View>
            <View style={styles.inputHalfcontainer}>
            	<TextInput
                onFocus={findCertificate}
                placeholder="Certificado"
                onChangeText={(e)=>{handleInputChange(e, 'certificate')}}
                value={formData.certificateName}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                onChangeText={(e)=>{handleInputChange(e, 'email')}}
                value={formData.email}
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={[styles.inputContainer, styles.input]}>
              <TextInput
                placeholder="Ocupacion"
                onChangeText={(e)=>{handleInputChange(e, 'job')}}
                value={formData.job}
                style={styles.input}
              />
              {/*<Picker
                selectedValue={formData.job}
                style={styles.selectInput}
                placeholder="Ocupacion"
                onValueChange={(itemValue, itemIndex) =>
                	handleInputChange(itemValue, 'job')
                }
              >
                <Picker.Item label="Ocupacion" value={null} disabled={true} />
                <Picker.Item label="Ingeniero" value="0" />
                <Picker.Item label="Contador" value="1" />
                <Picker.Item label="Abogado" value="2" />
                <Picker.Item label="Licenciado" value="3" />
                <Picker.Item label="Doctor" value="4" />
              </Picker>*/}
            </View>
          </View>
          <View style={styles.formRow}>
            <View style={[styles.inputContainer, styles.input]}>
              <Picker
                selectedValue={formData.nation}
                style={styles.selectInput}
                placeholder="Nacionalidad"
                onValueChange={(itemValue, itemIndex) =>
                	handleInputChange(itemValue, 'nation')
                }
              >
                <Picker.Item label="Nacionalidad" value={null} disabled={true} />
                <Picker.Item label="Guatemala" value="Guatemala" />
                <Picker.Item label="El Salvador" value="El Salvador" />
                <Picker.Item label="Honduras" value="Honduras" />
                <Picker.Item label="Nicaragua" value="Nicaragua" />
                <Picker.Item label="Costa Rica" value="Costa Rica" />
                <Picker.Item label="Panama" value="Panama" />
                <Picker.Item label="Colombia" value="Colombia" />
                <Picker.Item label="Mexico" value="Mexico" />
                <Picker.Item label="EEUU" value="EEUU" />
                <Picker.Item label="Ecuador" value="Ecuador" />
                <Picker.Item label="Chile" value="Chile" />
                <Picker.Item label="Argentina" value="Argentina" />
                <Picker.Item label="Peru" value="Peru" />
                <Picker.Item label="Paraguay" value="Paraguay" />
              </Picker>
            </View>
          </View>
          <View style={styles.buttonRow}>
            {loading &&(
              <ActivityIndicator visible={false} size='large' color='#26A657'  style={ {justifyContent: 'center'} }/>
            )}
            {!loading && (
              <TouchableOpacity onPress={submitForm} style={styles.sectionTouch}>
                <Icon
                  name="done"
                  color="#26A657"
                  size={50}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor:'white'
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 2,
        backgroundColor: '#fff'
    },
    logoRow: {
        flex: 1,
        alignItems: 'center'
    },
    logoContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo:{
		width: 250,
		height: 125,
        resizeMode: 'contain',
	},
    formContainer: {
        flex: 4
    },
    formLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#77D353',
        marginBottom: 10
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    inputContainer:{
        flex: 1,
    },
    inputHalfcontainer: {
        flex: 0.45
    },
	input: {
		borderBottomColor:'#828B95',
		borderBottomWidth:1
    },
    selectInput: {
        fontSize: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default FirstTimeForm;
