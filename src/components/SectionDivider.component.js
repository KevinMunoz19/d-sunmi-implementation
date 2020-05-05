import React from 'react';
import { Text, View, StyleSheet }	from 'react-native';
import colorPalette from '../utils/colors';

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
    backgroundColor:colorPalette.rgbColor,
		justifyContent: 'center',
		alignItems: 'center'
    },
    sectionText:{
		color:'white',
	},
});

export default SectionDivider;
