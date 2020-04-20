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
  ImageBackground
}	from 'react-native';
import {Actions} from 'react-native-router-flux';
import ClientBox from '../components/ClientBox';
import useClientForm from '../utils/useClientForm';
import Icon from "react-native-vector-icons/MaterialIcons";
import IosHeader from '../components/IosHeader';

const Clients = ({action,onSelect}) =>{

  const [clientList,setClientList] = useState([]);
  const {select} = DB();

  useEffect(()=>{
    var query = `select * from receiver`;
    select(query,[],(clients)=>{
      setClientList(clients);
    })
	},[])

  const handleSubmit = (action)=>{
    Actions.client({action:'create'});
  }

	return(
    <View style={styles.container}>
      {(onSelect==null) && (
				<IosHeader textHeader={'DTE'}/>
			)}
      <View style={styles.headerContainer}>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.textHeader}>CLIENTES</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scroll}>
          {(clientList.length>0) &&(
            <View style={styles.clientsContainer}>
            {
		          clientList.map((client)=>{
		            return(
		              <ClientBox key={client.nit} client={client} onSelect={onSelect} action={action}></ClientBox>
		            )
		          })
            }
            </View>
          )}
          {(clientList.length==0 &&
            <View style={styles.textContainer}>
            	<Text>No existen clientes registrados</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {(action == 'manage') && (
          <TouchableOpacity onPress={()=>handleSubmit({action:'create',onSelect:onSelect})} style={styles.createButton}>
            <Icon
              name="add-circle"
              color="rgb(234, 103, 46)"
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
    backgroundColor:'rgb(234, 103, 46)',
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
  clientsContainer:{
    width:'100%',
    alignItems:'center'
  }
});

export default Clients;
