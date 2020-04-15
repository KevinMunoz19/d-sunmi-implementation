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
		Picker
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

		const [count0,setCount0] = useState('');
		const [count1,setCount1] = useState('');
		const [count2,setCount2] = useState('');

		const [amount0,setAmount0] = useState('');
		const [amount1,setAmount1] = useState('');
		const [amount2,setAmount2] = useState('');

		const [tot,setTot] = useState([]);
		const [amount,setAmount] = useState([]);

		const [todayDay,setTodayDay] = useState('');
		const [todayDay2,setTodayDay2] = useState('');



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
			var qt = `select count(id) ct, payment from dte group by payment`;
			select(qt,[],(tt)=>{
					setCount0(tt[0].ct)
					setCount1(tt[1].ct)
					setCount2(tt[2].ct)
			})

			var qa = `select sum(amount) at, payment from dte group by payment`;
			select(qa,[],(ta)=>{
				setAmount0(ta[0].at);
				setAmount1(ta[1].at);
				setAmount2(ta[2].at);
			})
    },[])

		useEffect(()=>{
			var tzoffset = (new Date()).getTimezoneOffset()*60000;
	    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
			var nowDate = localISOTime.slice(0,10);
        var querybyday = `select * from dte where payment = 0 and date >= date('${nowDate.trim()} 00:00:00')`;
        select(querybyday,[],(dteday)=>{
					setTodayDay(dteday[0].date);
					//console.log(todayDay.slice(0,10).trim());
        })
    },[])

		useEffect(()=>{
			var tzoffset = (new Date()).getTimezoneOffset()*60000;
	    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
			var nowDate = localISOTime.slice(0,10);
			var nowYear = localISOTime.slice(0,4);
			var nowMonth = localISOTime.slice(5,7);

        var querybyday2 = `select * from dte where payment = 0 and date >= date('${nowYear.trim()}-${nowMonth.trim()}-01 00:00:00')`;
        select(querybyday2,[],(dteday2)=>{
					setTodayDay2(dteday2[0].date);
					//console.log(todayDay.slice(0,10).trim());
        })
				console.log("query string");
				console.log(querybyday2);

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

	function h() {

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




								<Text>Efectivo #{count0} Q{amount0}</Text>
								<Text>Cheque #{count1} Q{amount1}</Text>
								<Text>Tarjeta #{count2} Q{amount2}</Text>
								<Text>Fecha{todayDay}</Text>
								<Text>Fecha{todayDay2}</Text>


								<View style={styles.headerContainerSub}>
										<View style={styles.textHeaderContainerSub}>
												<Text style={styles.textHeaderSub}>Ordenar Por</Text>
										</View>
								</View>

								<View style={styles.formRow}>
			            <View style={[styles.inputContainer, styles.input]}>
			              <Picker
			                style={styles.selectInput}
			                placeholder="Mes"
			              >
			                <Picker.Item label="Mes" value={null} disabled={true} />
			                <Picker.Item label="Enero" value="0" />
			                <Picker.Item label="Febrero" value="1" />
											<Picker.Item label="Marzo" value="2" />
											<Picker.Item label="Abril" value="3" />
											<Picker.Item label="Mayo" value="4" />
											<Picker.Item label="Junio" value="5" />
											<Picker.Item label="Julio" value="6" />
											<Picker.Item label="Agosto" value="7" />
											<Picker.Item label="Septiembre" value="8" />
											<Picker.Item label="Octubre" value="9" />
											<Picker.Item label="Noviembre" value="10" />
											<Picker.Item label="Diciembre" value="11" />
			              </Picker>
			            </View>
			          </View>

								<View style={styles.formRow}>
			            <View style={[styles.inputContainer, styles.input]}>
			              <Picker
			                style={styles.selectInput}
			                placeholder="Dia"
			              >
			                <Picker.Item label="Dia" value={null} disabled={true} />
			                <Picker.Item label="1" value="0" />
			                <Picker.Item label="2" value="1" />
			              </Picker>
			            </View>
			          </View>





								<View style={styles.buttonContainer}>
									<TouchableOpacity style={styles.button} onPress={h}>
										<Text style={styles.buttonText}>Realizar Busqueda</Text>
									</TouchableOpacity>
								</View>








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
		button:{
			width:'40%',
			height:'90%',
			backgroundColor:'#828B95',
			alignItems:'center',
			justifyContent:'center'
		},
		buttonText:{
			color:'white',
			fontSize:15
		},
		buttonContainer:{
			flex:2,
			backgroundColor:'white',
			alignItems:'center'
		},
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

export default Dtes;
