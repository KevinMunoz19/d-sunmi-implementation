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

const Products = (props) =>{

    const [productList,setProductList] = useState([]);
    const {select} = DB();
    const {action,onSelect} = props;
    

    useEffect(()=>{
        
        var query = `select * from product`;
        select(query,[],(products)=>{
            setProductList(products);
        })
	},[])

    const handleSubmit = (action)=>{
        Actions.product({action:'create'});
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
                    {(action == 'manage') && (
                        <TouchableOpacity onPress={()=>handleSubmit({action:'create',onSelect:onSelect})} style={styles.createButton}>
                            <Icon
                                name="add-circle"
                                color="rgb(119,211,83)"
                                size={50}
                                style={styles.icon}
                            />
                            {/* <Text>REGISTRAR PRODUCTO</Text> */}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            // <ScrollView style={{backgroundColor:'black',flex:1}}>
            //     <View style={styles.container}>
            //         <View style={styles.headerContainer}>

            //         </View>
            //         <View style={styles.bodyContainer}>
 
            //         </View>
                    
                    

                               
            //     </View>
            // </ScrollView>
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
        backgroundColor:'rgb(119,211,83)',
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