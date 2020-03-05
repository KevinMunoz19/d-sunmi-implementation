import React, {useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Button,
    View,
    SafeAreaView,
    TextInput
  } from 'react-native';
import Modal from 'react-native-modal';

const InputModal = ({
    type,
    title,
    inputHandler,
    inputTwoHandler,
    keyboard,
    value,
    isVisible,
    onAceptarHandler
}) => {

    const [nitInput, setNit] = useState('');
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                // backdropColor="#26A657"
                // animationIn="zoomInDown"
                // animationOut="zoomOutUp"
                // animationInTiming={50}
                animationOutTiming={0}
                // backdropTransitionInTiming={50}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => setIsVisible(false)}
                style={styles.upperModal}
            >
                <View style={styles.content}>
                    {/* <Text style={styles.contentTitle}>Hi 👋!</Text> */}
                    <Text style={styles.contentTitle}>{title}</Text>
                    <TextInput
                        placeholder="Cantidad"
                        keyboardType={keyboard}
                        value={String(value.quantity)}
                        style={styles.nitInput}
                        onChangeText={(event) => {inputHandler(event)}}
                    />
                    {(inputTwoHandler != null) && (
                        <Text style={styles.contentTitle}>Precio</Text>
                    )}
                    {(inputTwoHandler != null) && (
                        <TextInput
                          placeholder="Precio"
                          keyboardType={keyboard}
                          value={String(value.price)}
                          style={styles.nitInput}
                          onChangeText={(event) => {inputTwoHandler(event)}}
                        />
                    )}
                    
                    <Button
                        // onPress={() => setIsVisible(false)}
                        onPress={() => onAceptarHandler()}
                        title="Aceptar"
                    />
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    upperModal: {
        justifyContent: 'center',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    nitInput: {
        alignSelf: 'flex-start',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 2,
        marginBottom: 12,
        width:'100%',
        textAlign:'center'
    }
  });

export default InputModal;