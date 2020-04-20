import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity
}	from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";

const ClientBox = (props) =>{

    const {client,action,onSelect} = props;

    const onAction = (client) =>{
        Actions.client({client:client,action:'edit'});
    }

	return(
		<View style={styles.clientBox}>

            <View style={styles.valuesColumn}>
                <Text style={styles.valuesText}>{client.name}</Text>
                {/* <View style={styles.detailsContainer}> */}
                    {/* <Text style={styles.valuesText}># {client.nit}</Text>
                    <Text style={styles.valuesText}>{client.email}</Text> */}
                {/* </View> */}
            </View>
            {(action=='manage') && (
                <TouchableOpacity onPress={()=>onAction(client)} style={styles.actionColumn}>
                    <Icon
                        name="edit"
                        color="rgb(234, 103, 46)"
                        size={50}
                        style={styles.icon}
				    />
                </TouchableOpacity>
            )}
            {(action=='select')&&(
                <TouchableOpacity onPress={()=>onSelect(client)} style={styles.actionColumn}>
                    <Icon
                        name="check"
                        color="rgb(234, 103, 46)"
                        size={50}
                        style={styles.icon}
				    />
                </TouchableOpacity>
            )}
        </View>
	);

}

const styles = StyleSheet.create({
    clientBox:{
        width:'90%',
        // marginTop:3,
        backgroundColor:'white',
        flexDirection:'row',
        // padding:5,
        borderTopWidth:1,
        borderTopColor:'rgb(234, 103, 46)',
        marginTop:10,
        alignItems: 'center'
    },
    descripcionColumn:{
        flex:0.5,
        //backgroundColor:'lightblue',
        padding:15
    },
    valuesColumn:{
        flex:2,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
    },
    detailsContainer:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
    actionColumn:{
        flex:0.5,
        //backgroundColor:'lightyellow',
        alignSelf:'center'
    },
    descripcionText:{
        marginTop:5,
        fontSize:10
    },
    valuesText:{
        fontSize:15,
        color:'#828B95'
    }
})

export default ClientBox;
