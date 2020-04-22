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
  Modal,
	Picker,
	Alert,
}	from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";
import IosHeader from '../components/IosHeader';
import useUser from '../utils/useUser';
import useApi from '../utils/useApi';

const infoUser = () =>{
  const [pdfModalVisible,setPdfModalVisible] = useState(false);
  const [pdfSource,setPdfSource] = useState(null);
  const [dteList,setDteList] = useState([]);
  const [loading,setLoading] = useState(false);
  const {select,insert} = DB();
	const [usersList,setUsersList] = useState([]);
	const [us,setUs] = useState('');
	const [pass,setPass] = useState('');
	const [visibleButton,setVisibleButton] = useState(false);

  const {getUser} = useUser();
  const [user,setUser] = useState();
  const {getInfo} = useApi();

  const [nn,setNn] = useState('');
	const [calle,setCalle] = useState('');
	const [direccion,setDireccion] = useState('');
	const [zona,setZona] = useState('');
	const [frases,setFrases] = useState('');
	const [afiliacion,setAfiliacion] = useState('');
	const [zipc,setZipc] = useState('');
	const [nombreComercial,setNombreComercial] = useState('');
	const [direccionComercial,setDireccionComercial] = useState('');
	const [numEstablecimiento,setNumEstablecimiento] = useState();
	const [autorizacion,setAutorizacion] = useState('');

  const [estNumber, setEstNumber] = useState(0);
  const [arrayZc,setArrayZc] = useState([]);
  const [arrayNc,setArrayNc] = useState([]);
  const [arrayDc,setArrayDc] = useState([]);

  const [displaydir, setDisplaydir] = useState("");
  const [displayzip, setDisplayzip] = useState("");


  useEffect(()=>{
	  getUser((userInfo)=>{
		  setUser(userInfo);
      console.log("Usuario use effect")
      console.log(userInfo)


      var newnitfetch = userInfo.string_nit.replace(/0+(?!$)/,'')
      // var nitPrueba = '35355913';
      getInfo(newnitfetch, (nom)=>{
        setNn(nom.toString())
      },(ca)=>{
        setCalle(ca.toString())
      },
      (dir)=>{
        setDireccion(dir.toString())
      },
      (zon)=>{
        setZona(zon.toString())
      },
      (fr)=>{
        setFrases(fr.toString())
      },
      (af)=>{
        setAfiliacion(af.toString())
      },
      (zpc)=>{
        setZipc(zpc.toString())
      },
      (nomc)=>{
        setNombreComercial(nomc.toString())
      },
      (dirc)=>{
        setDireccionComercial(dirc.toString())
      },
      (err)=>{
        if(err==200){
          Alert.alert('Error de conexion');
        }else{
          Alert.alert(err);
        }
      });

	  })
  },[])


  const onGetInfoBtn = () => {
    setTimeout(()=>{
      console.log("Entrada a onGetInfoBtn")
      var zcArray = zipc.trim().split('|');
      setArrayZc(zcArray);
      var ncArray = nombreComercial.trim().split('|');
      setArrayNc(ncArray);
      var dcArray = direccionComercial.trim().split('|');
      setArrayDc(dcArray);
      if (arrayDc.length > 0 && arrayZc.length > 0){
        setDisplaydir(arrayDc[estNumber].toString());
        setDisplayzip(arrayZc[estNumber].toString());
      }
    },500);
    // var query = `update users set requestor = ? where is_logged = ?;`;
    // insert(query,["AAA",1],(result)=>{
    //   console.log('result Update Logo',result);
    // })
  }

  const onSaveInfo = () => {

		// if (!estNumber){
			// Alert.alert('Seleccionar un establecimiento valido');
		// } else {
			var query = `update users set requestor = ? where is_logged = ?;`;
	    insert(query,[estNumber,1],(result)=>{
	      console.log('result Update Logo',result);
	    })
	    Actions.home()
		// }


  }

	return(
    <View style={styles.container}>
      <Modal visible={pdfModalVisible}>
        <TouchableOpacity  onPress={()=>Actions.home()} style={styles.closeModalButton}>
          <Icon
            name="keyboard-arrow-left"
            color="black"
            size={50}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Modal>
      <IosHeader/>
      <View style={styles.headerContainer}>
        <View style={styles.textHeaderContainer}>
            <Text style={styles.textHeader}>Informacion Usuario</Text>
        </View>
      </View>






      <View style={styles.bodyContainer}>
        <ScrollView style={styles.scroll}>



        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onGetInfoBtn}>
            <Text style={styles.buttonText}>Obtener Direcciones</Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.inputContainer, styles.input]}>
  				<Picker
  					style={styles.selectInput}
  					placeholder="Seleccionar Establecimiento"
  					selectedValue={estNumber}
  					onValueChange={(itemValue, itemIndex) => setEstNumber(itemValue)}
  				>
  					<Picker.Item label="Establecimientos" value={null} disabled={true} />
  					{arrayNc.map((usr,i)=>{
              var stringname = usr.toString().trim();
              while (stringname.substring(0,1) == "<" || (stringname.substring(0,1) >='0' && stringname.substring(0,1) <='9')) {
                stringname = stringname.substring(1);
              }
  						var st = `${usr.toString()}`;
  						var num = `${usr.toString()}`;
  							return(
  									<Picker.Item label= {stringname} value={i} />
  							)
  					})}
  				</Picker>
  			</View>



          <View style={styles.generateBillButtonContainer}>
						<TouchableOpacity onPress={onSaveInfo} style={styles.actionButton}>
							<Icon
								name="add"
								color="#26A657"
								size={50}
								style={styles.icon}
							/>
							<Text>Seleccionar Establecimiento</Text>
						</TouchableOpacity>
					</View>




        </ScrollView>
      </View>
    </View>
	);
}

const styles = StyleSheet.create({
  button:{
    width:'50%',
    height:'100%',
    backgroundColor:'#828B95',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    color:'white',
    fontSize:12,
  },
  buttonContainer:{
    flex:2,
    backgroundColor:'white',
    alignItems:'center'
  },
  inputContainer:{
	  justifyContent: 'center',
		width: '60%',
		flex: 1,

  },
  input: {
    borderBottomColor:'#828B95',
    borderBottomWidth:1
  },
  selectInput: {
		fontSize: 10
  },
  generateBillButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20
	},
  generateBillButton: {
		width: '60%'
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
  },
	detailsContainer:{
		alignItems:'center',
		flexDirection:'row',
		justifyContent:'space-around',
		width:'100%',
	},
	valuesText:{
		fontSize:10,
		marginTop:5,
	},
	valuesColumn:{
		flex:2,
		alignItems:'center',
		flexDirection:'column',
		justifyContent:'space-around'
	},
  closeModalButton:{
	  flexDirection:'row'
  },
  container:{
    flex:1,
    backgroundColor:'white'
  },
  textHeader:{
    color:'white',
    fontSize:15
  },
  textHeaderContainer:{
    width:'60%',
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
  // buttonContainer:{
  //   flex:1,
  // },
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
  },
	textHeaderContainerSub:{
    width:'30%',
    height:'80%',
    backgroundColor:'rgb(119,211,83)',
    alignItems:'center',
    justifyContent:'center'
  },
  headerContainerSub:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
	textHeaderSub:{
    color:'white',
    fontSize:12
  },
	// buttonContainer:{
	// flex:2,
	// backgroundColor:'white',
	// alignItems:'center'
	// },
	// button:{
	// width:'50%',
	// height:'90%',
	// backgroundColor:'#828B95',
	// alignItems:'center',
	// justifyContent:'center'
	// },
	// buttonText:{
	// color:'white',
	// fontSize:20
	// },
	formRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30
  },
	inputContainer:{
		flex: 1,
	},
	input: {
		borderBottomColor:'#828B95',
		borderBottomWidth:1
	},
	selectInput: {
		fontSize: 10
	},
});

export default infoUser;
