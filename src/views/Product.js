import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
	View,
	ScrollView,
	TextInput,
	Button,
	Alert,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	BackHandler
}	from 'react-native';

import useProduct from '../utils/useProduct'
import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from 'react-native-router-flux';
import IosHeader from '../components/IosHeader';

const Product = ({id,product,action,onSelect}) =>{
	const {inputs,setInputs, handleInputChange, handleSubmit} = useProduct();

	BackHandler.addEventListener('hardwareBackPress', function() {
		Actions.home();
		return true;
	});


	useEffect(() => {
		console.log(action);
		if(action!='create'){
			console.warn(product);
			setInputs({name:product.name,code:product.code,price:product.price,id:product.id});
		}
		if(onSelect!=null)handleInputChange('quantity',1);
		handleInputChange('code',(Math.random()*100000).toFixed(0));
		
	}, [])

	return(
		<ScrollView style={{backgroundColor:'white'}}>
			<View style={{backgroundColor:'white'}}>
				{(onSelect==null) && (
					<IosHeader textHeader={'DTE'}/>
				)}	
				<View style={{
							height:80,
							justifyContent:'flex-end',
							alignItems:'center'
						}}>
						<View style={{
							backgroundColor:'rgb(119,211,83)',
							width:'50%',
							height:'50%',
							justifyContent:'center',
							alignItems:'center'
						}}>
							<Text style={{
								color:'white',
								fontSize:20
							}}
							>
								Producto
							</Text>
						</View>
				</View>
				<View style={styles.inputContainer}>
						<Text>Nombre</Text>
						<TextInput
							style={styles.input}
							onChangeText={(e)=>{handleInputChange('name',e)}}
							value={inputs.name}
						/>
				</View>

				{/* <View style={styles.inputContainer}>
						<Text>Codigo</Text>
						<TextInput
							style={styles.input}
							onChangeText={(e)=>{handleInputChange('code',e)}}
							value={`${inputs.code |''}`}
						/>
				</View> */}

				<View style={styles.inputContainer}>
						<Text>Precio con IVA</Text>
						<TextInput
							style={styles.input}
							onChangeText={(e)=>{handleInputChange('price',e)}}
							value={inputs.price == null?'':String(inputs.price)}
							keyboardType = 'decimal-pad'
						/>
				</View>		
				{(onSelect!=null) &&(
					<View style={styles.inputContainer}>
						<Text>Cantidad</Text>
						<TextInput
							style={styles.input}
							onChangeText={(e)=>{handleInputChange('quantity',e)}}
							value={inputs.quantity == null?'1':String(inputs.quantity)}
							keyboardType = 'decimal-pad'
						/>
					</View>
				)}
				{(action == 'edit') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'edit'})} style={styles.actionButton}>
							<Icon
								name="edit"
								color="#26A657"
								size={50}
								style={styles.icon}
							/>
							<Text >EDITAR</Text>
						</TouchableOpacity>
					)}
					{(action == 'edit') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'delete'})} style={styles.actionButton}>
							<Icon
								name="delete-forever"
								color="#f53d3d"
								size={50}
								style={styles.icon}
							/>
							<Text >ELIMINAR</Text>
						</TouchableOpacity>
					)}
					{(action == 'create') && (
						<TouchableOpacity onPress={()=>handleSubmit({action:'create',onSelect:onSelect}) } style={styles.actionButton}>
							<Icon
								name="add"
								color="#26A657"
								size={50}
								style={styles.icon}
							/>
							<Text >REGISTRAR</Text>
						</TouchableOpacity>
					)}			
			</View>
		</ScrollView>

	);

}

const styles = StyleSheet.create({
    inputContainer:{
		paddingTop:'4%',
		paddingLeft:'9%',
		paddingRight:'9%',
		textAlign:'center',
	},
	input:{
		borderBottomColor:'#DDD',
		borderBottomWidth:1
	},

	actionButton:{
		marginTop:5,
        flexDirection:'row',
        backgroundColor:'white',
        borderBottomColor:'#26A657',
        borderTopColor:'#26A657',
        borderBottomWidth:1,
        borderTopWidth:1,
        justifyContent:'center',
        alignItems:'center'
    }
	
});

export default Product;