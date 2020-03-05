import React from 'react';

import {
    View,
    StyleSheet,
    Dimensions
}	from 'react-native';

import Pdf from 'react-native-pdf';

const PdfView = (props) =>{
    const {source} = props;
    
	return(
		<View style={styles.container}>
            <Pdf
                source={{uri:`data:application/pdf;base64,${source}`}}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log('error del pdf',error);
                }}
                style={styles.pdf}/>
        </View>
	);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
})

export default PdfView;