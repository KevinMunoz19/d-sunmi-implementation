import React, {Fragment,useState,useEffect} from 'react';

import {
	Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
    Alert,
    ActivityIndicator,
		requireNativeComponent,


		NativeModules,
		NativeEventEmitter,
}	from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";
import useApi from "../utils/useApi";
import useDte from "../utils/useDte";
import useUser from '../utils/useUser';
import DteOptions from './DteOptions.component';

import fb from 'rn-fetch-blob'
const printer = NativeModules.PrintModule;

const DteBox = ({dte,setPdfSource}) =>{

    const {getBill,getBillXML, getInfo} = useApi();
    const {cancelDte} = useDte();
    const {getUser} = useUser();

    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState();
    const [optionModalVisible,setOptionModalVisible] = useState(false);
		const [xmldata,setXmldata] = useState('');

		const [nn,setNn] = useState('');
		const [calle,setCalle] = useState('');
		const [direccion,setDireccion] = useState('');
		const [zona,setZona] = useState('');
		const [frases,setFrases] = useState('');
		const [afiliacion,setAfiliacion] = useState('');
		const [zipc,setZipc] = useState('');
		const [nombreComercial,setNombreComercial] = useState('');
		const [direccionComercial,setDireccionComercial] = useState('');
		const [cantidadesString,setCantidadesString] = useState('');
		const [preciosString,setPreciosString] = useState('');
		const [descripcionesString,setDescripcionesString] = useState('');
		const [fl,setFl] = useState(false);

		const [numEstablecimiento,setNumEstablecimiento] = useState();

    useEffect(()=>{
		getUser((userInfo)=>{
			setUser(userInfo);
		})
    },[])

		useEffect(()=>{
			setNumEstablecimiento(0);

		})

    const onAction = ()=>{
			var newnitfetch = user.string_nit.replace(/0+(?!$)/,'')
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


				getBillXML(user.token,user.string_nit,dte.auth_number, (ca)=>{
					setCantidadesString(ca);
				},
				(pr)=>{
					setPreciosString(pr.toString())
				},
				(des)=>{
					setDescripcionesString(des.toString())
				},
				(re)=>{
					setXmldata(re);
				},
				(err)=>{
					Alert.alert(err);
				});
        setOptionModalVisible(true);
    };


		const fetchdata = ()=>{

			var newnitfetch = user.string_nit.replace(/0+(?!$)/,'')
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


				getBillXML(user.token,user.string_nit,dte.auth_number, (ca)=>{
					setCantidadesString(ca);
				},
				(pr)=>{
					setPreciosString(pr.toString())
				},
				(des)=>{
					setDescripcionesString(des.toString())
				},
				(re)=>{
					setXmldata(re);
				},
				(err)=>{
					Alert.alert(err);
				});
				onReprintDte();
    };

    const onViewDte = ()=>{
        setOptionModalVisible(false);
        setLoading(true);
				//getBillXML(user.token,user.string_nit,dte.auth_number, (xmldata)=>{
				//	setXmldata(xmldata);
				//},(err)=>{
				//	Alert.alert(err);
				//});
				getBill(user.token,user.string_nit,dte.auth_number,(source)=>{
            setPdfSource(source);
            setLoading(false);
        },(err)=>{
            setLoading(false);
            Alert.alert(err);
        })
    }


		const onReprintDte = ()=>{


			if (cantidadesString == null){
				//setOptionModalVisible(false);
				fetchdata();
			}else{

				setLoading(true);

				var numeroserie = dte.serie;
				var numero = dte.number;
				var numeroaut = dte.auth_number;
				var fechadte = dte.date;
				var nombrereceptor = dte.receiver_name;
				var nitreceptor = dte.receiver_nit;
				var totaldte = dte.amount;


				console.log("entrada a reprint");
				var newnitfetch = user.string_nit.replace(/0+(?!$)/,'')

				console.log(`resultados cantidades ${cantidadesString}`)

				getBill(user.token,user.string_nit,dte.auth_number,(source)=>{
					setXmldata(source);
					printer.reprint(nn.toString(),nombreComercial.toString(),direccionComercial.toString(), newnitfetch.toString(), numeroserie.toString(), numero.toString(), numeroaut.toString(), fechadte.toString(), nombrereceptor.toString(),nitreceptor.toString(),cantidadesString.toString(),descripcionesString.toString(),preciosString.toString(),totaldte.toString());
					//setLoading(false);
				},(err)=>{
						setLoading(false);
						Alert.alert(err);
				})

				setOptionModalVisible(false);
				setLoading(false);
			}



		}




    const onCancelDte = ()=>{
        // solicitar eliminar el documento
        setOptionModalVisible(false);
        setTimeout(()=>{
            Alert.alert(
                'Alerta',
                'Esta seguro de anular esta factura ?',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => {

                        },
                        style: 'cancel',
                    },
                    {text: 'De Acuerdo', onPress: () => {
                        setLoading(true);
                        cancelDte(user,dte,()=>{
                            Alert.alert("Documento Anulado");
                            setLoading(false);
                        },(err)=>{
                            Alert.alert(err);
                            setLoading(false);
                        })
                    }},
                ]
            );
        },200)


    }


		//const onImprimirDte = () => {
			//activityStarter.navigateToExample("Hello")
		//}

    const onCloseModal = ()=>{
        setOptionModalVisible(false);
    }

	return(
		<View style={styles.productBox}>
            {optionModalVisible &&
                <DteOptions
                    isVisible = {true}
                    onViewDte = {onViewDte}
                    onCancelDte = {onCancelDte}
                    onReprintDte = {onReprintDte}
                    onCloseModal = {onCloseModal}
                    dteStatus = {dte.status}




                />
            }
            <View style={styles.valuesColumn}>
                <Text style={styles.valuesText}>{dte.receiver_name}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.valuesText}># {dte.date}</Text>
                    <Text style={styles.valuesText}>Q {dte.amount}</Text>
                </View>
                <Text style={styles.valuesText}>{(dte.status == 0) && 'Anulada'}{(dte.status == 1) && 'Vigente'}</Text>
            </View>

            <TouchableOpacity onPress={()=>onAction()} style={styles.actionColumn}>
                <Icon
                    name="view-week"
                    color="black"
                    size={30}
                    style={styles.icon}
                />
                {(loading)&&(
                    <ActivityIndicator visible={false} size='large' color='#26A657'/>
                )}
            </TouchableOpacity>
        </View>
	);

}

const styles = StyleSheet.create({
    productBox:{
        width:'90%',
        // marginTop:3,
        backgroundColor:'white',
        flexDirection:'row',
        // padding:5,
        borderTopWidth:1,
        borderTopColor:'rgb(119,211,83)',
        marginTop:10,
        alignItems: 'center'
    },
    detailsContainer:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
    descripcionColumn:{
        flex:0.5,
//        backgroundColor:'lightblue',
        padding:15
    },
    valuesColumn:{
        flex:2,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'space-around'
    },
    actionColumn:{
        flex:0.5,
//        backgroundColor:'lightyellow',
        alignSelf:'center'
    },
    descripcionText:{
        fontSize:10,
        marginTop:5,
    },
    valuesText:{
        fontSize:10,
        marginTop:5,
    },
    quantity:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default DteBox;
