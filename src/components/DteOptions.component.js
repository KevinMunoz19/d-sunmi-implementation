import React, {useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    Button,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity
  } from 'react-native';
import Modal from 'react-native-modal';
import Icon from "react-native-vector-icons/MaterialIcons";

const DteOptions = ({
    isVisible,
    onViewDte,
    onCancelDte,
    onReprintDte,
    onCloseModal,
    dteStatus,
    onEmailDte,
}) => {
    return(
        <View style={styles.container}>
            <Modal
                isVisible={isVisible}
                animationOutTiming={0}
                // backdropTransitionInTiming={50}
                backdropTransitionOutTiming={0}
                // onBackdropPress={() => setIsVisible(false)}
                style={styles.upperModal}
            >
            <TouchableOpacity  onPress={()=>onViewDte()} style={styles.sectionTouch}>
                <Text style={styles.sectionTouchText}>VER DOCUMENTO</Text>
            </TouchableOpacity>
            {(dteStatus == 1 ) &&
            <TouchableOpacity  onPress={()=>onReprintDte()} style={styles.sectionTouch}>
                <Text style={styles.sectionTouchText}>REIMPRIMIR DOCUMENTO</Text>
            </TouchableOpacity>
            }
            {(dteStatus == 1 ) &&
            <TouchableOpacity  onPress={()=>onCancelDte()} style={styles.sectionTouch}>
                <Text style={styles.sectionTouchText}>ANULAR DOCUMENTO</Text>
            </TouchableOpacity>
            }
            {(dteStatus == 1 ) &&
            <TouchableOpacity  onPress={()=>onEmailDte()} style={styles.sectionTouch}>
                <Text style={styles.sectionTouchText}>ENVIAR DOCUMENTO</Text>
            </TouchableOpacity>
            }

            <TouchableOpacity  onPress={()=>onCloseModal()} style={styles.sectionTouch}>
                <Text style={styles.sectionTouchText}>CERRAR</Text>
            </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    // content: {
    //   backgroundColor: 'white',
    //   padding: 22,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderRadius: 4,
    //   borderColor: 'rgba(0, 0, 0, 0.1)',
    // },
    upperModal: {
        justifyContent: 'center',
    },
    sectionTouch:{
        // marginLeft:'20%',
        marginTop:'6%',
        backgroundColor:'rgba(234, 103, 46, 0.5)',
        width:'100%',
        // width:'60%',
        height:'12%',
        flexDirection:'row',
        alignItems:'center',


        justifyContent:'center',

    },
    sectionTouchText:{
        marginBottom:'5%',
        marginLeft:'5%',
        //fontSize:40,
        fontSize:20,
        color:'white'
    }
  });

export default DteOptions;
