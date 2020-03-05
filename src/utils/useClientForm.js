import React,{useState} from 'react';

import {Alert} from 'react-native';
import DB from './DB';
import {Actions} from 'react-native-router-flux';
import { validateEmail } from './emailValidator';


const useClientForm = (callback) => {
	
	const [inputs, setInputs] = useState({
		nit: '',
		name: '',
		email: '',
		address: '',
		municipality: '',
		department: '',
		zipCode:''
	});

	const {select,insert} = DB();

  	const handleInputChange = (name,value) => {
	  setInputs(inputs => ({...inputs, [name]: value}));
	}

	const handleSubmit = ({action,onSelect}) =>{
		//El uso del trim es para validar que no se ingresen puros espacios en blancos y se pasen string vacios
		//Se debe mejorar la validacion sobre el zipcode
		if (
			inputs.nit.trim().length > 0 &&
			inputs.name.trim().length > 0 &&
			validateEmail(inputs.email) &&
			inputs.address.trim().length > 0 &&
			inputs.zipCode &&
			inputs.municipality.trim().length > 0 &&
			inputs.department.trim().length > 0
		) {

			var fields = [
				inputs.nit,
				inputs.name,
				inputs.email,
				inputs.address,
				inputs.zipCode,
				inputs.municipality,
				inputs.department
			]
			var query =``;
			var messageVerb='';
			if(action == 'create'){
				messageVerb='CREADO';
				query = `
				INSERT INTO receiver(nit,name,email,address,zip_code,municipality,department)
				VALUES(?,?,?,?,?,?,?)
				`;
			}else if (action == 'edit'){
				messageVerb='Actualizado';
				query =`
					UPDATE receiver set nit=?,name=?,email=?,address=?,zip_code=?,municipality=?,department=?
					WHERE id = ?;
				`;
				fields.push(inputs.id);
			}else if(action == 'delete'){
				messageVerb='ELIMINADO';
				query = `DELETE from receiver where id = ?`,
				fields = [inputs.id];
			}
			
			insert(query,fields,(result)=>{
				Alert.alert(`CLIENTE ${messageVerb} con exito`);
				if(onSelect == null){
					Actions.clients({action:'manage'});
				}else{
					select(`select * from receiver order by id desc limit 1`,[],(client)=>{
						console.log(client[0]);
						client[0].quantity = inputs.quantity;
						onSelect(client[0]);
					})
				}
				
			});
		} else {
			Alert.alert('Todos los campos son requeridos!');
		}
	}

	const findByNit = (nit,cb)=>{
		select('select * from receiver where nit = ?',[nit],(result)=>{
			cb(result);
		})
	}

	return {
	    handleSubmit,
	    handleInputChange,
		inputs,
		setInputs,
		findByNit
	};
}
export default useClientForm;