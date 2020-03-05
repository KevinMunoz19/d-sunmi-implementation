import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
    Alert,
    ActivityIndicator
}	from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";

const IosHeader = (props)=>{
    const {textHeader} = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{Actions.home()}} style={styles.backButtonContainer}>
                <Icon
                    name="keyboard-arrow-left"
                    color="black"
                    size={35}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <View style={styles.textView}>
                <Text style={styles.headerText}></Text>
            </View>
            <View style={styles.headerSpace}>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        // height:'15%',
        // width:'100%',
        flex:1,
        marginTop:10,
        flexDirection:'row'
    },
    backButtonContainer:{
        height:'100%',
        width:'20%',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    textView:{
        height:'100%',
        width:'60%',
        alignItems:'center',
        justifyContent:'center'
    },
    headerSpace:{
        height:'100%',
        width:'20%',
    },
    headerText:{
        fontSize:20,
    }
})


export default IosHeader;