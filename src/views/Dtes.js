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
  Modal
}	from 'react-native';
import {Actions} from 'react-native-router-flux';
import DteBox from '../components/DteBox';
import Icon from "react-native-vector-icons/MaterialIcons";
import PdfView from "../components/PdfView";
import IosHeader from '../components/IosHeader';
import useUser from '../utils/useUser';

const Dtes = () =>{

  const [pdfModalVisible,setPdfModalVisible] = useState(false);
  const [pdfSource,setPdfSource] = useState(null);
  const [dteList,setDteList] = useState([]);
  const [loading,setLoading] = useState(false);
  const {select} = DB();

	const [dteListCash,setDteListCash] = useState([]);
	const [dteListCard,setDteListCard] = useState([]);
	const [dteListCheck,setDteListCheck] = useState([]);


	const {getUser} = useUser();
	const [user,setUser] = useState();

	const [num,setNum] = useState('');

	var flag = 1;

  // useEffect(()=>{
  //   var query = `select * from dte`;
	// 	select(query,[],(dtes)=>{
  //   	setDteList(dtes);
  //   })
  // },[])


	useEffect(()=>{
	  // var query = `select * from dte where string_nit = '${nit}'`;
		var query = `select * from dte where string_nit = '${num}'`;
		select(query,[],(dtes)=>{
	  	setDteList(dtes);
	  })
	},[num])

  useEffect(()=>{
	if(pdfSource != null){
		setLoading(false);
		setPdfModalVisible(true);
	}
  },[pdfSource]);

	useEffect(()=>{
		getUser((userInfo)=>{
			setUser(userInfo);
			var x = userInfo.string_nit;
			setNum(x);
		})
	},[])




  const onClosePdf = ()=>{
		setPdfModalVisible(false);
	}


	return(
  	<View style={styles.container}>
      <Modal visible={pdfModalVisible}>
        <TouchableOpacity  onPress={()=>onClosePdf()} style={styles.closeModalButton}>
          <Icon
            name="keyboard-arrow-left"
            color="black"
            size={50}
            style={styles.icon}
          />
        </TouchableOpacity>
        <PdfView source={pdfSource}/>
      </Modal>
    	<IosHeader/>
      <View style={styles.headerContainer}>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.textHeader}>FACTURAS</Text>
        </View>
      </View>
        <View style={styles.bodyContainer}>
          <ScrollView style={styles.scroll}>
            {(dteList.length>0) &&(
              <View style={styles.dtesContainer}>
              {
              dteList.map((dte,i)=>{
                return(
                  <DteBox key={i} dte={dte} setPdfSource={setPdfSource}/>
                )
              })
              }
              </View>
            )}
            {(dteList.length==0 &&
              <View style={styles.textContainer}>
                <Text>No existen facturas registradas</Text>
              </View>
            )}
          </ScrollView>
        </View>
    </View>
	);
}

const styles = StyleSheet.create({
  closeModalButton:{
		flexDirection:'row'
  },
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
  dtesContainer:{
    width:'100%',
    alignItems:'center'
  }
});

export default Dtes;
