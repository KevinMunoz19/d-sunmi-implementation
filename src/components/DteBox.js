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



const activityStarter = NativeModules.ActivityStarter;
const eventEmitterModule = NativeModules.EventEmitter;



const DteBox = ({dte,setPdfSource}) =>{

    const {getBill} = useApi();
    const {cancelDte} = useDte();
    const {getUser} = useUser();

    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState();
    const [optionModalVisible,setOptionModalVisible] = useState(false);


    useEffect(()=>{
		getUser((userInfo)=>{
			setUser(userInfo);
		})
    },[])

    const onAction = ()=>{
        setOptionModalVisible(true);
        // setLoading(true);
        // getBill(user.token,user.string_nit,dte.auth_number,(source)=>{
        //     setPdfSource(source);
        //     setLoading(false);
        // },(err)=>{
        //     setLoading(false);
        //     Alert.alert(err);
        // })
    };

    const onViewDte = ()=>{
        setOptionModalVisible(false);
        setLoading(true);
        getBill(user.token,user.string_nit,dte.auth_number,(source)=>{
            setPdfSource(source);
            setLoading(false);
        },(err)=>{
            setLoading(false);
            Alert.alert(err);
        })
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
    const onResendDte = ()=>{

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
                    onResendDte = {onResendDte}
                    onCloseModal = {onCloseModal}
                    dteStatus = {dte.status}



										//onImprimirDte = {onImprimirDte}
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
