import React,{useState, useEffect} from 'react';

import DB from './DB';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';


import useApi from './useApi';
import useUser from './useUser';

const useProduct = (callback) => {

	const [inputs, setInputs] = useState({});

	const {select,insert} = DB();

	const {addProduct,deleteProduct} = useApi();
	const {getUser} = useUser();
	const [user,setUser] = useState();

	useEffect(()=>{
		getUser((userInfo)=>{
			setUser(userInfo);
		})
	},[])

  	const handleInputChange = (name,value) => {
	  setInputs(inputs => ({...inputs, [name]: value}));
	}

	const handleSubmit = ({action,onSelect}) =>{
		console.warn(inputs)
		if (inputs.name &&
			inputs.code &&
			inputs.price &&
			inputs.type
		) {
			var fields = [
				inputs.name,
				inputs.code,
				inputs.price,
				inputs.type
			]
			var query =``;
			var messageVerb='';
			if(action == 'create'){
				messageVerb='CREADO';
				query = `
				INSERT INTO product(name,code,price,type)
				VALUES(?,?,?,?)
				`;

				// addProduct(user.string_nit, inputs.name, inputs.price, inputs.type,(res)=>{
				// 	console.log("Resultado")
				// 	console.log(res)
				// },(rej)=>{
				// 	console.log("Rejected")
				// 	console.log(rej)
				// })

			}else if (action == 'edit'){
				messageVerb='Actualizado';
				query =`
					UPDATE product set name=?,code=?,price=?,type=?
					WHERE id = ?;
				`;
				fields.push(inputs.id);
			}else if(action == 'delete'){
				console.warn('')
				messageVerb='ELIMINADO';
				query = `DELETE from product where id = ?`,
				fields = [inputs.id];
			}else if(action == 'unique'){
				fields = [inputs.id];
			}



			console.warn(query);
			console.warn(fields);


			if(action == 'unique'){
				var uniqueProduct = { price: inputs.price, code: "uniqueproduct", name: inputs.name, id: 150, quantity: inputs.quantity, type: inputs.type };
				onSelect(uniqueProduct);
			} else {
				if(action == 'create'){
				// addProduct(user.string_nit, inputs.name, inputs.price, inputs.type,(res)=>{
				addProduct(user.string_nit, inputs.name, inputs.price, inputs.type,(res)=>{
					console.log("Resultado")
					console.log(res)
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
				},(rej)=>{
					console.log("Rejected")
					console.log(rej)
				})
			}else if (action == 'delete') {
				deleteProduct(user.string_nit, inputs.name,(res)=>{
					console.log("Resultado")
					console.log(res)
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
				},(rej)=>{
					console.log("Rejected")
					console.log(rej)
				})
			}



			// insert(query,fields,(result)=>{
			// 	Alert.alert(`Producto ${messageVerb} con exito`);
			// 	if(onSelect == null){
			// 		Actions.products({action:'manage'});
			// 	}else{
			// 		select(`select * from product order by id desc limit 1`,[],(product)=>{
			// 			console.log(product[0]);
			// 			product[0].quantity = inputs.quantity;
			// 			onSelect(product[0]);
			// 		})
			// 	}
			// });










				}



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
