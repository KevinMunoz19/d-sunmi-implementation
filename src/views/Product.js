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
	BackHandler,
	Picker
}	from 'react-native';

import useProduct from '../utils/useProduct'
import Icon from "react-native-vector-icons/MaterialIcons";
import {Actions} from 'react-native-router-flux';
import IosHeader from '../components/IosHeader';
import colorPalette from '../utils/colors';

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
			setInputs({name:product.name,code:product.code,price:product.price,id:product.id,type:product.type});
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
						backgroundColor:colorPalette.rgbColor,
						width:'50%',
						height:'50%',
						justifyContent:'center',
						alignItems:'center'
					}}>
						<Text style={{
							color:'white',
							fontSize:20
						}}>
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




<View style={styles.inputContainer}>
<Text>Tipo</Text>


					<View style={[styles.inputContainerPicker, styles.inputPicker]}>
						<Picker
							selectedValue={inputs.type}
							style={styles.selectInputPicker}
							placeholder="Tipo"
							onValueChange={(itemValue, itemIndex) =>
								handleInputChange('type',itemValue)
							}
						>
							<Picker.Item label="Tipo" value={null} disabled={true} />
							<Picker.Item label="Bien" value="BIEN" />
							<Picker.Item label="Servicio" value="SERVICIO" />

						</Picker>
					</View>


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
							color={colorPalette.color}
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
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >REGISTRAR y AGREGAR</Text>
						</TouchableOpacity>
					)}

					{(onSelect!=null) &&(
						<TouchableOpacity onPress={()=>handleSubmit({action:'unique',onSelect:onSelect}) } style={styles.actionButton}>
							<Icon
								name="add"
								color={colorPalette.color}
								size={50}
								style={styles.icon}
							/>
							<Text >AGREGAR</Text>
						</TouchableOpacity>
					)}
			</View>
		</ScrollView>

	);

}

const styles = StyleSheet.create({
	inputContainerPicker:{
    flex: 1,
  },
	inputPicker: {
		borderBottomColor:'#828B95',
		borderBottomWidth:1
  },
  selectInputPicker: {
    fontSize: 10
  },
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
    borderBottomColor:colorPalette.color,
    borderTopColor:colorPalette.color,
    borderBottomWidth:1,
    borderTopWidth:1,
    justifyContent:'center',
    alignItems:'center'
    }

});

export default Product;
