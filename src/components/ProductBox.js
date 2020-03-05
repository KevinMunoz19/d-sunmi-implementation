import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Button
}	from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputModal from './InputModal.component.js';

const ProductBox = (props) =>{

    const {product,action,onSelect,onRemove} = props;
    const [quantityModalVisible,setQuantityModalVisible] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState(product);
    
    const onAction = (product) =>{
        Actions.product({product:product,action:'edit'});
    }


    const onProductSelect = ()=>{
        setSelectedProduct({...selectedProduct,quantity:1});
        setQuantityModalVisible(true);
    }

    const onQuantityDefined = (qt)=>{
        setSelectedProduct({...selectedProduct,quantity:qt})
    }

    const onPriceDefined = (price)=>{
        setSelectedProduct({...selectedProduct,price:price})
    }

    const onProductDefined = ()=>{
        setQuantityModalVisible(false);
        onSelect(selectedProduct);
    }

	return(
		<View style={styles.productBox}>
            {/* <Modal transparent={true} visible={quantityModalVisible} >
                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                    <View style={{
                            backgroundColor:'white',
                            width: 300,
                            height: 100}}>
                        <Text>CANTIDAD</Text>
                        <TextInput onChangeText={(e)=>{onQuantityDefined(e)}} 
                             value={`${selectedProduct.quantity}`}
                             keyboardType='decimal-pad'
                             style={{
                                backgroundColor : 'rgb(235, 235, 235)'
                             }}/>
                        <Button title="Aceptar"onPress={()=>onProductDefined()}></Button>
                    </View>
                </View>
            </Modal> */}
            {quantityModalVisible &&
                <InputModal
                    type={'CANTIDAD'}
                    title={'CANTIDAD'}
                    inputHandler={onQuantityDefined}
                    inputTwoHandler={onPriceDefined}
                    keyboard={'decimal-pad'}
                    value={selectedProduct}
                    isVisible={quantityModalVisible}
                    onAceptarHandler={onProductDefined}
                />
            }
            {/* Dimensiones del modal, stackoverflow:
                https://stackoverflow.com/questions/40703648/set-width-and-height-to-react-native-modal
            */}
            {/* <View style={styles.infoColumn}>
                <View style={styles.infoRow}>
                    <Text style={styles.descripcionText}>Nombre: </Text>
                    <Text style={styles.valuesText}>{product.name}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.descripcionText}>Codigo: </Text>
                    <Text style={styles.valuesText}>{product.code}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.descripcionText}>Precio: </Text>
                    <Text style={styles.valuesText}>{product.price}</Text>
                </View>
            </View> */}
            {/* <View style={styles.descripcionColumn}>
                <Text style={styles.descripcionText}>Nombre: </Text>
                <Text style={styles.descripcionText}>Codigo: </Text>
                <Text style={styles.descripcionText}>Precio: </Text>
            </View> */}

            <View style={styles.valuesColumn}>
                <Text style={styles.valuesText}>{product.name}</Text>
                <View style={styles.detailsContainer}>
                    {/* <Text style={styles.valuesText}>#{product.code}</Text> */}
                    <Text style={styles.valuesText}>Q {String(parseFloat(product.price).toFixed(2))}</Text>
                </View>
                
            </View>
            {(action=='manage') && (
                <TouchableOpacity onPress={()=>onAction(product)} style={styles.actionColumn}>
                    <Icon
                        name="edit"
                        color="rgb(119,211,83)"
                        size={50}
                        style={styles.icon}
				    />
                </TouchableOpacity>
            )}
            {(action=='select')&&(
                <TouchableOpacity onPress={()=>onProductSelect()} style={styles.actionColumn}>
                    <Icon
                        name="check"
                        color="rgb(119,211,83)"
                        size={50}
                        style={styles.icon}
				    />
                </TouchableOpacity>
            )}

            {(action=='item')&&(
                <View style={styles.quantity}>
                    <Text style={styles.quantity} >X{product.quantity}</Text>
                </View>
                
            )} 
            {(action=='item')&&(
                <TouchableOpacity onPress={()=>onRemove(product)} style={styles.actionColumn}>
                    <Icon
                        name="delete-forever"
                        color="red"
                        size={50}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )} 
            
        </View>
	);

}

const styles = StyleSheet.create({
    productBox:{
        width:'90%',
        // marginTop:3,
        backgroundColor:'white',
        flexDirection:'row',
        // padding:5,
        borderTopWidth:1,
        borderTopColor:'rgb(119,211,83)',
        marginTop:10,
        alignItems: 'center'
    },
    infoColumn: {
        flexDirection: 'column',
    },
    infoRow: {
        flexDirection: 'row'
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    descripcionColumn:{
        flex:0.5,
//        backgroundColor:'lightblue',
        // padding:15
        marginRight: 15
    },
    valuesColumn:{
        flex:2,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
//        backgroundColor:'lightgreen',
        // padding:15
    },
    detailsContainer:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
    actionColumn:{
        flex:0.5,
//        backgroundColor:'lightyellow',
        alignSelf:'center'
    },
    descripcionText:{
        fontSize:10,
        marginTop:5,
    },
    valuesText:{
        fontSize:15,
        color:'#828B95'
        // marginTop:5,
    },
    quantity:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProductBox;