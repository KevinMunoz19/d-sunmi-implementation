import React, {Fragment,useState,useEffect} from 'react';
import DB from '../utils/DB';

import {
	Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  BackHandler
}	from 'react-native';
import {Actions} from 'react-native-router-flux';
import ProductBox from '../components/ProductBox';
import useProduct from '../utils/useProduct';
import Icon from "react-native-vector-icons/MaterialIcons";
import IosHeader from '../components/IosHeader';
import colorPalette from '../utils/colors';


import useApi from '../utils/useApi';
import useUser from '../utils/useUser';

const Products = (props) =>{

  const [productList,setProductList] = useState([]);
  const {select,insert} = DB();
  const {action,onSelect} = props;

	const {getUser} = useUser();
	const [user,setUser] = useState();
	const {getAllProducts} = useApi();
	const [nitTemporal,setNitTemporal] = useState('');

const [nombresString,setNombresString] = useState('');
const [preciosString,setPreciosString] = useState('');
const [tiposString,setTiposString] = useState('');

const [refreshFlag,setRefreshFlag] = useState(false);



  useEffect(()=>{
    var query = `select * from product`;
    select(query,[],(products)=>{
      setProductList(products);
    })
		setRefreshFlag(false);
	},[refreshFlag])

	useEffect(()=>{
		getUser((userInfo)=>{
			setUser(userInfo);
			setNitTemporal(userInfo.string_nit);
		})
	},[])

	useEffect(()=>{
		getAllProducts(nitTemporal, (name)=>{
			console.log("nombres")
			console.log(name)
			setNombresString(name);
		},(pre)=>{
			console.log("precios")
			console.log(pre)
			setPreciosString(pre);
		},
		(ti)=>{
			console.log("tipos")
			console.log(ti)
			setTiposString(ti);
		},
		(err)=>{
				Alert.alert(`Error de la peticion obtener productos -> ${err}`);
		});

	},[nitTemporal])

  const handleSubmit = (action)=>{
    Actions.product({action:'create'});
  }


	const refreshList = () => {
		console.log("entrada a refreshList");

		var query =`DELETE from product`;
    insert(query,[],(result)=>{
      console.log('Tabla de Productos Borrada con Exito');
    },(err)=>{
      console.log('ocurrio un error borrando los productos', err);
    })

		var nameArray = nombresString.split('|')
		var priceArray = preciosString.split('|')
		var typeArray = tiposString.split('|')



		// console.log("nombre")
		// console.log(typeof nameTemp)
		// console.log(nameTemp)
		// console.log("precio")
		// console.log(typeof priceTemp)
		// console.log(priceTemp)
		// console.log("tipo")
		// console.log(typeof typeTemp)
		// console.log(typeTemp)

		for (i = 0; i < nameArray.length; i++) {
			var nameTemp = nameArray[i];
			var priceTemp = parseFloat(priceArray[i].toString());
			var typeTemp = typeArray[i];

			var codeTemp = (Math.random()*100000).toFixed(0);

			var query =`INSERT INTO product(name,code,price,type)
			VALUES(?,?,?,?)`;
	    insert(query,[nameTemp,codeTemp,priceTemp,typeTemp],(result)=>{
	      console.log('Actualizacion de Productos Exitosa');
	    },(err)=>{
	      console.log('ocurrio un error actualizando los productos', err);
	    })
		}

		setRefreshFlag(true);


	}



	return(
  	<View style={styles.container}>
	    {(onSelect==null) && (
				<IosHeader textHeader={'DTE'}/>
			)}
      <View style={styles.headerContainer}>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.textHeader}>PRODUCTOS</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scroll}>
          {(productList.length>0) &&(
            <View style={styles.productsContainer}>
              {productList.map((product)=>{
                return(
                  <ProductBox key={product.id} product={product} onSelect={onSelect} action={action} style={styles.productBox}></ProductBox>
                )
              })}
            </View>
          )}
          {(productList.length==0 &&
            <View style={styles.textContainer}>
              <Text>No existen productos registrados</Text>
            </View>
          )}
        </ScrollView>
      </View>



			<View style={styles.buttonContainer}>
          <TouchableOpacity onPress={refreshList} style={styles.createButton}>
            <Icon
              name="restore"
              color={colorPalette.rgbColor}
              size={50}
              style={styles.icon}
            />
          </TouchableOpacity>
      </View>




      <View style={styles.buttonContainer}>
        {(action == 'manage') && (
          <TouchableOpacity onPress={()=>handleSubmit({action:'create',onSelect:onSelect})} style={styles.createButton}>
            <Icon
              name="add-circle"
              color={colorPalette.rgbColor}
              size={50}
              style={styles.icon}
            />
            {/* <Text>REGISTRAR PRODUCTO</Text> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
	container:{
    flex:1,
    backgroundColor:'white'
  },
  textHeader:{
    color:'white',
    fontSize:20
  },
  textHeaderContainer:{
    width:'50%',
    height:'50%',
    backgroundColor:colorPalette.rgbColor,
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  textContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  bodyContainer:{
    flex:8,
    // alignItems:'center'
  },
  buttonContainer:{
    flex:1,
  },
  scroll:{
    flex:1,
  },
  createButton:{
    flexDirection:'row',
    // backgroundColor:'white',
    // borderBottomColor:'#26A657',
    // borderTopColor:'#26A657',
    // borderBottomWidth:1,
    // borderTopWidth:1,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  icon:{
    marginRight:20
  },
  productsContainer:{
    width:'100%',
    alignItems:'center'
  }
});

export default Products;
