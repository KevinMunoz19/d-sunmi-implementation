import React,{useState} from 'react';

import DB from './DB';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

const useProduct = (callback) => {
	
	const [inputs, setInputs] = useState({});

	const {select,insert} = DB();

  	const handleInputChange = (name,value) => {
	  setInputs(inputs => ({...inputs, [name]: value}));
	}

	const handleSubmit = ({action,onSelect}) =>{
		console.warn(inputs)
		if (inputs.name &&
			inputs.code &&
			inputs.price
		) {

			var fields = [
				inputs.name,
				inputs.code,
				inputs.price
			]
			var query =``;
			var messageVerb='';
			if(action == 'create'){
				messageVerb='CREADO';
				query = `
				INSERT INTO product(name,code,price)
				VALUES(?,?,?)
				`;
			}else if (action == 'edit'){
				messageVerb='Actualizado';
				query =`
					UPDATE product set name=?,code=?,price=?
					WHERE id = ?;
				`;
				fields.push(inputs.id);
			}else if(action == 'delete'){
				console.warn('')
				messageVerb='ELIMINADO';
				query = `DELETE from product where id = ?`,
				fields = [inputs.id];
			}
			console.warn(query);
			console.warn(fields)
			insert(query,fields,(result)=>{
				Alert.alert(`Producto ${messageVerb} con exito`);
				if(onSelect == null){
					Actions.products({action:'manage'});
				}else{
					select(`select * from product order by id desc limit 1`,[],(product)=>{
						console.log(product[0]);
						product[0].quantity = inputs.quantity;
						onSelect(product[0]);
					})
				}
				
				
			});
		} else {
			Alert.alert('Todos los campos son requeridos!');
		}

	}

	return {
	    handleSubmit,
	    handleInputChange,
		inputs,
		setInputs
	};
}
export default useProduct;