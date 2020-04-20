import React from 'react';
import { Text, View, StyleSheet }	from 'react-native';

const SectionDivider = ({sectionName,width}) => {
    return(
        <View style={[styles.sectionHeader,{width:width}]}>
            <Text style={styles.sectionText}>{sectionName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
	sectionHeader:{
		flex: 1,
		flexDirection:'row',
		height:'5%',
        backgroundColor:'rgb(234, 103, 46)',
		justifyContent: 'center',
		alignItems: 'center'
    },
    sectionText:{
		color:'white',
	},
});

export default SectionDivider;
