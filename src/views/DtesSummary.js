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

const Dtes = () =>{

    const [pdfModalVisible,setPdfModalVisible] = useState(false);
    const [pdfSource,setPdfSource] = useState(null);
    const [dteList,setDteList] = useState([]);
    const [loading,setLoading] = useState(false);
    const {select} = DB();

		const [dteListCash,setDteListCash] = useState([]);
		const [dteListCheck,setDteListCheck] = useState([]);
		const [dteListCard,setDteListCard] = useState([]);


		useEffect(()=>{
        var query = `select * from dte where payment = 0`;
        select(query,[],(dtes)=>{
            setDteListCash(dtes);
        })
    },[])

    useEffect(()=>{
        var queryc = `select * from dte where payment = 1`;
        select(queryc,[],(dtesc)=>{
            setDteListCheck(dtesc);
        })
    },[])

		useEffect(()=>{
        var queryt = `select * from dte where payment = 2`;
        select(queryt,[],(dtest)=>{
            setDteListCard(dtest);
        })
    },[])







    useEffect(()=>{
		if(pdfSource != null){
			setLoading(false);
			setPdfModalVisible(true);
		}
    },[pdfSource]);

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
                    <Text style={styles.textHeader}>RESUMEN DE FACTURAS</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.scroll}>




									<View style={styles.headerContainerSub}>
			                <View style={styles.textHeaderContainerSub}>
			                    <Text style={styles.textHeaderSub}>PAGO CON EFECTIVO</Text>
			                </View>
			            </View>
                    {(dteListCash.length>0) &&(
                        <View style={styles.dtesContainer}>
                        {
                        dteListCash.map((dte,i)=>{
                            return(
                                <DteBox key={i} dte={dte} setPdfSource={setPdfSource}/>
                            )
                        })
                        }
                        </View>
                    )}
                    {(dteListCash.length==0 &&
                        <View style={styles.textContainer}>
                            <Text>No existen facturas registradas con efectivo</Text>
                        </View>
                    )}


										<View style={styles.headerContainerSub}>
				                <View style={styles.textHeaderContainerSub}>
				                    <Text style={styles.textHeaderSub}>PAGO CON CHEQUE</Text>
				                </View>
				            </View>
	                    {(dteListCheck.length>0) &&(
	                        <View style={styles.dtesContainer}>
	                        {
	                        dteListCheck.map((dtec,i)=>{
	                            return(
	                                <DteBox key={i} dte={dtec} setPdfSource={setPdfSource}/>
	                            )
	                        })
	                        }
	                        </View>
	                    )}
	                    {(dteListCheck.length==0 &&
	                        <View style={styles.textContainer}>
	                            <Text>No existen facturas registradas con cheque</Text>
	                        </View>
	                    )}


											<View style={styles.headerContainerSub}>
					                <View style={styles.textHeaderContainerSub}>
					                    <Text style={styles.textHeaderSub}>PAGO CON TARJETA</Text>
					                </View>
					            </View>
		                    {(dteListCard.length>0) &&(
		                        <View style={styles.dtesContainer}>
		                        {
		                        dteListCard.map((dteca,i)=>{
		                            return(
		                                <DteBox key={i} dte={dteca} setPdfSource={setPdfSource}/>
		                            )
		                        })
		                        }
		                        </View>
		                    )}
		                    {(dteListCard.length==0 &&
		                        <View style={styles.textContainer}>
		                            <Text>No existen facturas registradas con tarjeta</Text>
		                        </View>
		                    )}




                </ScrollView>
            </View>
        </View>
	);

}

const styles = StyleSheet.create({
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
});

export default Dtes;
