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
import DteBox from '../components/DteBox';
import Icon from "react-native-vector-icons/MaterialIcons";
import PdfView from "../components/PdfView";
import IosHeader from '../components/IosHeader';

import DatePicker from 'react-native-date-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const Dtes = () =>{

  const [pdfModalVisible,setPdfModalVisible] = useState(false);
  const [pdfSource,setPdfSource] = useState(null);
  const [dteList,setDteList] = useState([]);
  const [loading,setLoading] = useState(false);
  const {select} = DB();

	const [dteListCash,setDteListCash] = useState([]);
	const [dteListCheck,setDteListCheck] = useState([]);
	const [dteListCard,setDteListCard] = useState([]);

	const [count0,setCount0] = useState('0');
	const [count1,setCount1] = useState('0');
	const [count2,setCount2] = useState('0');

	const [amount0,setAmount0] = useState('0');
	const [amount1,setAmount1] = useState('0');
	const [amount2,setAmount2] = useState('0');

	const [tot,setTot] = useState([]);
	const [amount,setAmount] = useState([]);

	const [todayDay,setTodayDay] = useState('');
	const [todayDay2,setTodayDay2] = useState('');

	const [selectedDate1, setSelectedDate1] = useState(new Date());
	const [selectedDate2, setSelectedDate2] = useState(new Date());
	// const [st] = useState({
  //     tableHead: ['Visite Date', 'Member', 'you ...', 'etc..'],
  //     tableData: [
  //       ['07/29/2016', 'JEFF', '$46.80', '...'],
  //       ['07/29/2016', 'JEFF', '$46.80', '...'],
  //       ['07/29/2016', 'JEFF', '$46.80', '...'],
  //       ['07/29/2016', 'JEFF', '$46.80', '...']
  //     ]
  //   })
	const [st,setSt] = useState({
      tableHead: ['Visite Date', 'Member', 'you ...', 'etc..'],
      tableData: [
        ['07/29/2016', 'JEFF', '$46.80', '...'],
        ['07/29/2016', 'JEFF', '$46.80', '...'],
        ['07/29/2016', 'JEFF', '$46.80', '...'],
        ['07/29/2016', 'JEFF', '$46.80', '...']
      ]
    })


	function PadLeft(value, length) {
		return (value.toString().length < length) ? PadLeft("0" + value, length) :
		value;
	}

  useEffect(()=>{
		if(pdfSource != null){
			setLoading(false);
			setPdfModalVisible(true);
		}
  },[pdfSource]);

  const onClosePdf = ()=>{
		setPdfModalVisible(false);
	}

	function searchbydate() {

		setDteListCash([]);
		setDteListCheck([]);
		setDteListCard([]);
		setCount0('0');
		setCount1('0');
		setCount2('0');
		setAmount0('0');
		setAmount1('0');
		setAmount2('0');
		setSt({
				tableHead: ['', 'Cantidad', 'Total'],
				tableData: [
					['Efectivo', `0`, `Q. 00.00`],
					['Cheque', `0`, `Q. 00.00`],
					['Tarjeta', `0`, `Q. 00.00`]

				]
			})

		if ((selectedDate1 <= selectedDate2) || (selectedDate1.getDate() == selectedDate2.getDate() && selectedDate1.getMonth() == selectedDate2.getMonth() && selectedDate1.getFullYear() == selectedDate2.getFullYear())) {

			var iDay = PadLeft(selectedDate1.getDate(),2);
			var iMonth = PadLeft((selectedDate1.getMonth() + 1),2);
			var iYear = selectedDate1.getFullYear();
			var fDay = PadLeft(selectedDate2.getDate() + 1,2);
			var fMonth = PadLeft((selectedDate2.getMonth() + 1),2);
			var fYear = selectedDate2.getFullYear();

			var query = `select * from dte where payment = 0 and date >= date('${iYear}-${iMonth}-${iDay} 00:00:00') and date <= date('${fYear}-${fMonth}-${fDay} 23:59:59')`;
			select(query,[],(dtes)=>{
	    	setDteListCash(dtes);
	    })

			var queryc = `select * from dte where payment = 1 and date >= date('${iYear}-${iMonth}-${iDay} 00:00:00') and date <= date('${fYear}-${fMonth}-${fDay} 23:59:59')`;
	    select(queryc,[],(dtesc)=>{
	    	setDteListCheck(dtesc);
	    })

			var queryt = `select * from dte where payment = 2 and date >= date('${iYear}-${iMonth}-${iDay} 00:00:00') and date <= date('${fYear}-${fMonth}-${fDay} 23:59:59')`;
	    select(queryt,[],(dtest)=>{
	    	setDteListCard(dtest);
	    })

			var qt = `select count(id) ct, payment from dte where date >= date('${iYear}-${iMonth}-${iDay} 00:00:00') and date <= date('${fYear}-${fMonth}-${fDay} 23:59:59') group by payment`;
			select(qt,[],(tt)=>{
				setCount0(tt[0].ct)
				setCount1(tt[1].ct)
				setCount2(tt[2].ct)
			})

			var qa = `select sum(amount) at, payment from dte where date >= date('${iYear}-${iMonth}-${iDay} 00:00:00') and date <= date('${fYear}-${fMonth}-${fDay} 23:59:59') group by payment`;
			select(qa,[],(ta)=>{
				setAmount0(ta[0].at);
				setAmount1(ta[1].at);
				setAmount2(ta[2].at);
			})

				// setSt({
			  //     tableHead: ['', 'Cantidad', 'Total'],
			  //     tableData: [
			  //       ['Efectivo', `${count0}`, `Q. ${amount0}`],
			  //       ['Cheque', `${count1}`, `Q. ${amount1}`],
			  //       ['Tarjeta', `${count2}`, `Q. ${amount2}`]
			  //     ]
			  //   })
		} else {
			Alert.alert(`La fecha inicial debe ser menor a la fecha final`);
		}
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
												<Text style={styles.textHeaderSub}>Desde</Text>
										</View>
								</View>

								<DatePicker
									date = {selectedDate1}
									onDateChange = {setSelectedDate1}
									mode="date"
									locale = "es"
									style={styles.dp}
								/>

								<View style={styles.headerContainerSub}>
										<View style={styles.textHeaderContainerSub}>
												<Text style={styles.textHeaderSub}>Hasta</Text>
										</View>
								</View>

								<DatePicker
									date = {selectedDate2}
									onDateChange = {setSelectedDate2}
									mode="date"
									locale = "es"
									style={styles.dp}

								/>

								<View style={styles.buttonContainer}>
									<TouchableOpacity style={styles.button} onPress={searchbydate}>
										<Text style={styles.buttonText}>Buscar</Text>
									</TouchableOpacity>
								</View>


								<View style={styles.containert}>
					        <Table borderStyle={{borderWidth: 2, borderColor: '#e78b4d'}}>
					          <Row data={['', 'Cantidad', 'Total']} style={styles.headt} textStyle={styles.textt}/>
					          <Rows data={[
							        ['Efectivo', `${count0}`, `Q. ${amount0}`],
							        ['Cheque', `${count1}`, `Q. ${amount1}`],
							        ['Tarjeta', `${count2}`, `Q. ${amount2}`]
							      ]} textStyle={styles.textt}/>
					        </Table>
					      </View>

									<View style={styles.headerContainerSubT}>
			                <View style={styles.textHeaderContainerSubT}>
			                    <Text style={styles.textHeaderSubT}>PAGO CON EFECTIVO</Text>
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


										<View style={styles.headerContainerSubT}>
				                <View style={styles.textHeaderContainerSubT}>
				                    <Text style={styles.textHeaderSubT}>PAGO CON CHEQUE</Text>
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


											<View style={styles.headerContainerSubT}>
					                <View style={styles.textHeaderContainerSubT}>
					                    <Text style={styles.textHeaderSubT}>PAGO CON TARJETA</Text>
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
        backgroundColor:'rgb(234, 103, 46)',
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
		containert: {
			flex: 1,
			padding: 16,
			paddingTop: 30,
			backgroundColor: '#fff'
		},
	  headt: {
			height: 30,
			backgroundColor: '#f06f17'
		},
	  textt: {
			margin: 6
		},
		dp: {
			alignItems:'center',
			justifyContent:'center',
			height: 80,
			//padding: 10,
			marginLeft: 30
		},
		textHeaderContainerSubT:{
        width:'45%',
        height:'80%',
        backgroundColor:'rgb(234, 103, 46)',
        alignItems:'center',
        justifyContent:'center'
    },
    headerContainerSubT:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
		textHeaderSubT:{
        color:'white',
        fontSize:12
    },
});

export default Dtes;
