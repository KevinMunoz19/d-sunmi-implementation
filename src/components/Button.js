import React from 'react';

import {
	Text,
    StyleSheet,
    TouchableOpacity
}	from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";

const Button = (props) =>{

    const {press,color,iconName,buttonLabel} = props;

	return(
		<TouchableOpacity onPress={press} style={styles.actionButton}>
            <Icon 
                name={iconName}
                color={color}
                size={50}
                style={styles.icon}
            />
            <Text >{buttonLabel}</Text>
        </TouchableOpacity>
	);

}

const styles = StyleSheet.create({
    actionButton:{
		marginTop:5,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:{color},
        borderTopColor:{color},
        borderBottomWidth:1,
        borderTopWidth:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Button;