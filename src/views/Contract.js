import React, { useState,useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";
import useUser from "../utils/useUser"; 
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
    ActivityIndicator,
    ScrollView,
    Alert
}	from 'react-native';

const Contract = () => {
    const {getUser,confirmContract} = useUser();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const acceptContract = () => {
        setLoading(true);
        confirmContract();
        Actions.contractMessage();
    };
    useEffect(()=>{
        getUser((user)=>{
            setUser(user)
        })
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.logoRow}>
                <Image source={require('../img/logo.png')} style={styles.logo}/>
            </View>
                
            <View style={styles.contentContainer}>
                <View style={[styles.viewLabel]}>
                    <Text style={{color: "#fff", fontSize: 20, padding: 3}}>Contrato</Text>
                </View>
                <ScrollView style={{ paddingHorizontal:20, backgroundColor: '#828B95' }}>
                    <Text style={{color: '#fff', flex: 1}}> 
                    CONTRATO DE SERVICIOS DE CERTIFICACIÓN Y ALMACENAMIENTO DE DOCUMENTOS TRIBUTARIOS
                    ELECTRÓNICOS (DTE) CELEBRADO ENTRE
                    CYBER ESPACIO, SOCIEDAD ANÓNIMA Y {user!=null && user.contact_name} {"\n"}   
                    {"\n"} 
                    Nosotros,{"\n"} 
                    {"\n"} 
                    NESTOR ARTURO BALLESTEROS RODRIGUEZ de treinta y nueve años de edad, casado, guatemalteco,
                    contador, con domicilio en el Departamento de Guatemala, con Documento de Identificación Personal con Código
                    Único de Identificación dos mil cuatrocientos cuarenta y siete, setenta mil trescientos setenta y nueve, cero ciento
                    uno (2447 70379 0101) extendido por el Registro Nacional de las Personas de la República de Guatemala. Actúo en
                    mi calidad de Administrador Único y Representante Legal de la entidad CYBER ESPACIO, SOCIEDAD ANÓNIMA,
                    en adelante también “CYBERESPACIO” o “EL CERTIFICADOR”, lo que acredito con el Acta Notarial que
                    contiene mi nombramiento, autorizada en esta ciudad el veinte de marzo del año dos mil dieciocho por la Notario
                    Ana Lucía Rámila Falla, e inscrito en el Registro Mercantil General de la República bajo el número quinientos treinta
                    mil quinientos sesenta (530560), folio quinientos setenta y seis (576) del libro seiscientos ochenta y uno (681) de
                    Auxiliares de Comercio, y que pongo a la vista para verificar que cuento con facultades suficientes para la
                    celebración del presente; y  {user!=null && user.contact_name}, de nacionalidad {user!=null && user.nationality}, profesión u oficio
                    {user!=null && user.profession}, de este domicilio, con Documento
                    Personal de Identificación con código único de identificación número {user!=null && user.document_id}  extendido por el Registro
                    Nacional de las Personas de la República de Guatemala. Actúo en mi calidad de Representante
                    Legal de la entidad {user!=null && user.contact_name}, en adelante también “EL EMISOR”.{"\n"}
                    {"\n"}Declaramos:{"\n"}
                    {"\n"}
                    i.	Que somos de los datos generales consignados y nos encontramos en el pleno y libre ejercicio de nuestros derechos civiles;
                    {"\n"}{"\n"}
                    ii.	Que las representaciones que se ejercitan son amplias y suficientes para el presente contrato a nuestro juicio y de conformidad con la ley, y que las mismas no han sido revocadas o limitadas en forma alguna a la fecha de la celebración del presente documento; 
                    {"\n"}{"\n"}
                    iii.	Que cada una de las partes tiene la capacidad suficiente para obligarse en nombre de su representada en los términos del presente documento y de los que del mismo se deriven, y su celebración no da como consecuencia violación o incumplimiento de algún otro contrato u obligación a la que se encontraran sujetos a la presente fecha nuestras representadas, entre ellas o con terceros.
                    {"\n"}{"\n"}
                    iv.	En virtud de lo expuesto, comparecemos con el objeto de celebrar “CONTRATO DE SERVICIOS DE CERTIFICACIÓN Y ALMACENAMIENTO DE DOCUMENTOS TRIBUTARIOS ELECTRONICOS”, en adelante el “Contrato”), el cual se regirá por las cláusulas y condiciones expuestas a continuación, las cuales otorgamos y aceptamos mutuamente:
                    {"\n"}{"\n"}
                    {"\n"}{"\n"}
                    Primera: Definiciones:
                    {"\n"}{"\n"}
                    Régimen FEL:  Régimen de Factura Electrónica en Línea.  Es el modelo operativo y las normas aplicables a la factura electrónica.
                    {"\n"}{"\n"}
                    SAT:  Superintendencia de Administración Tributaria
                    {"\n"}{"\n"}
                    DTE:  Documento Tributario Electrónico. Es un archivo  electrónico en formato XML certificado de acuerdo con las disposiciones del régimen FEL que comprende facturas, notas de débito y crédito, recibos y otros documentos autorizados por la SAT.
                    {"\n"}{"\n"}
                    Certificador:  la entidad Cyber Espacio, S.A. Es la entidad a cargo de la certificación y almacenamiento de los DTE transmitidos por el Emisor.
                    {"\n"}{"\n"}
                    Emisor: el contribuyente que emite los DTE, en este caso la entidad {user!=null && user.contact_name}.
                    {"\n"}{"\n"}
                    Disposición del Régimen FEL:  Son todas las normas aprobadas por la SAT, tales como  el Régimen de Factura Electrónica En Línea, la documentación técnica FEL, así como las normas y procedimientos relacionados y las que se emitan con posterioridad.
                    {"\n"}{"\n"}
                    Documentación Técnica FEL:  Instrumento que la SAT emite y mantiene actualizado por medio de resoluciones de Superintendente para actualizar el Acuerdo que regula el régimen de factura electrónica en línea.
                    {"\n"}{"\n"}
                    Reporte mensual de DTE:  Reporte de los DTE certificados que El Certificador deberá presentar a la SAT mensualmente por medios electrónicos de conformidad con la Documentación Técnica FEL.
                    {"\n"}{"\n"}
                    Certificación de DTE:  es el proceso por medio del cual el certificador verifica y autoriza cada DTE. La verificación consiste en confirmar que el emisor aplicó las reglas y validaciones vigentes desarrolladas en la documentación técnica FEL. 
                    {"\n"}{"\n"}
                    Segunda: Antecedentes.
                    {"\n"}{"\n"}
                    I.	La entidad CYBER ESPACIO, SOCIEDAD ANÓNIMA: (i) es una entidad autorizada por la SAT para operar como Certificador de Documentos Tributarios Electrónicos (DTE); (ii) tiene la capacidad jurídica para contratar; y, (iii) reúne las condiciones económicas y técnicas, así como los recursos materiales y humanos para cumplir con las obligaciones de este contrato.
                    {"\n"}{"\n"}
                    II.	EL EMISOR: (i) Es un contribuyente habilitado por la SAT como Emisor de Documentos Tributarios Electrónicos (DTE)  y que cuenta con una certificación de firma electrónica para emitir documentos electrónicos a sus clientes desde su propio sistema informático previa validación y autorización por parte de el certificador y la SAT;  (ii) que tiene la capacidad jurídica para contratar; y, (iii) reúne las condiciones económicas y técnicas, así como los recursos materiales y humanos para cumplir con las obligaciones de este contrato.
                    {"\n"}{"\n"}
                    Por lo anterior, EL CERTIFICADOR y EL EMISOR acuerdan los siguientes términos y condiciones:
                    {"\n"}{"\n"}
                    1.	DE LOS SERVICIOS DEL CERTIFICADOR: EL CERTIFICADOR, a cambios del pago de los honorarios que se pactarán más adelante entre las partes, estará a cargo de la prestación de los servicios de; (i) CERTIFICACIÓN: Este servicio implica la verificación y autorización de cada DTE que le sea transmitido por EL EMISOR en formato XML, a través de la confirmación que el emisor haya aplicado las reglas y validaciones vigentes y desarrolladas en la documentación vigente FEL. Al resultar satisfactoria la verificación, El CERTIFICADOR  autorizará de forma automática e individual el archivo electrónico en formato XML que fue transmitido por EL EMISOR, asignándole un número único incorporándole su firma electrónica avanzada de acuerdo con el proceso de Factura Electrónica en Línea, así como la del EMISOR. (ii) ALMACENAMIENTO O CONSERVACIÓN:  Este servicio consiste en la obligación por parte de EL EMISOR de conservar los archivos de formato XML de los DTE certificados y los respectivos acuses de recibo que la SAT le haya enviado, por un plazo indefinido y hasta el momento que la SAT le indique que puede prescindir del almacenamiento de los DTE que haya certificado, lo cual se le comunicará al momento de la renovación de su autorización como certificador. El CERTIFICADOR se compromete a cumplir con las políticas de seguridad, respaldo y de continuidad de negocio, emitidas por la SAT. Garantizando al EMISOR, la continuidad del servicio en caso de caso fortuito y fuerza mayor.  (iii) MESA DE AYUDA:  EL CERTIFICADOR prestará el servicio de mesa de ayuda la cual va contemplada en los honorarios ya pactados, para EL EMISOR la cual estará disponible durante el horario habitual de facturación de EL EMISOR, horario que se establecerá en el Anexo 
                    I: “Pactos Específicos del Contrato de Servicios”.
                    {"\n"}{"\n"} 
                    2.	DE LOS HONORARIOS Y FORMA DE PAGO: EL EMISOR estará obligado al pago de honorarios a EL CERTIFICADOR por la prestación de los servicios de certificación y almacenamiento relacionados en la cláusula que antecede de conformidad con las condiciones específicas contenidas en el Anexo I: “Pactos Específicos del Contrato de Servicios”, que contiene los acuerdos relativos a los honorarios a pagar a EL CERTIFICADOR en base al número de facturas que se certifiquen de acuerdo con el precio por factura según los horarios de prestación de servicios de certificación al Emisor,  forma de pago y cualesquiera otras condiciones acordadas entre las partes. Dicho Anexo formará parte del presente contrato  y será firmado por ambas partes en señal de aceptación y podrá ser modificado o ampliado en cualquier momento de mutuo acuerdo.
                    {"\n"}{"\n"}
                    3.	OBLIGACIÓN DE ENTREGA DE LOS DOCUMENTOS TRIBUTARIOS ELECTRONICOS (DTE) A LA SAT: EL CERTIFICADOR se obliga a entregar a la SAT todos los DTE del EMISOR y EL EMISOR acepta  que EL CERTIFICADOR entregue a la SAT la información de los DTE durante el plazo que dura la relación de servicios o por un plazo mayor si la ley lo requiriere. En caso el CERTIFICADOR no cumpla con esta obligación, será el responsable del pago de la multa o sanción que la SAT establezca al EMISOR y de ser necesario el pago de abogados contratados para la defensa, así como los daños y perjuicios causados por su incumplimiento.
                    {"\n"}{"\n"}
                    4.	ACEPTACIÓN DE LAS DISPOSICIONES DEL RÉGIMEN DE FACTURA ELECTRÓNICA EN LÍNEA:  EL EMISOR se obliga a sujetarse a las condiciones de emisión de los DTE establecidas por la SAT, incluyendo los requisitos técnicos, la impresión, el almacenamiento y el uso de firmas electrónicas avanzadas como forma de identificación de EL EMISOR y de EL CERTIFICADOR, para garantizar la autenticidad, integridad, validez y no repudio de los DTE.
                    {"\n"}{"\n"}
                    5.	FIRMA DEL EMISOR:   Para garantizar la autenticidad, integridad, validez y aceptación de los DTE que emita, EL EMISOR se obliga a incluir una firma electrónica de emisión en cada DTE que emita y entregue a EL CERTIFICADOR.
                    {"\n"}{"\n"}
                    6.	AUTENTICIDAD DE LOS DOCUMENTOS TRIBUTARIOS ELECTRÓNICOS (DTE):  EL EMISOR y EL CERTIFICADOR reconocen que los DTE que contentan firma electrónica de emisión válida, certificados, son irrefutables para fines legales, judiciales y tributarios respecto de los datos firmados.
                    {"\n"}{"\n"}
                    7.	SEGURIDAD DE LA INFORMACIÓN: Tanto EL EMISOR como EL CERTIFICADOR aceptan los requisitos y criterios de seguridad de la información establecidos por la SAT y sus futuras actualizaciones en relación con el Régimen de Factura Electrónica en Línea. 
                    {"\n"}{"\n"}
                    8.	CONFIDENCIALIDAD: EL CERTIFICADOR reconoce que  como consecuencia de la prestación de servicios objeto del presente contrato, tendrá acceso a información confidencial propiedad de EL EMISOR y de sus clientes o receptores del documento electrónico, por lo que se obliga a que durante el tiempo que dure la relación contractual y con posterioridad a la terminación de la misma, por un plazo indefinido, mantendrá confidencial y no divulgará dicha información a terceros no autorizados ni a utilizar para fines distintos al Régimen de Factura Electrónica en Línea.
                    {"\n"}{"\n"}
                    9.	RELEVO DE RESPONSABILIDAD:  EL CERTIFICADOR reconoce y manifiesta que es responsable por los servicios de Factura Electrónica en línea que presta a EL EMISOR y de cualquier tipo de responsabilidad incluyendo la civil y penal que pudiera derivar de cualquier incumplimiento, acción u omisión de su parte que causare perjuicio a EL EMISOR, relevando expresamente a la SAT de cualquier obligación que pudiese surgir como consecuencia del presente contrato y su incumplimiento.
                    {"\n"}{"\n"}
                    10.	CUMPLIMIENTO DE LEYES APLICABLES: Ambas partes se comprometen a cumplir con todas las leyes y regulaciones aplicables en relación con sus obligaciones dentro del presente Contrato.
                    {"\n"}{"\n"}
                    11.	RELACIÓN ENTRE LAS PARTES: Este contrato no otorgará ningún derecho o relación exclusiva entre las partes.  Ambas partes  pueden celebrar contratos de servicios de certificación y almacenamiento de documentos tributarios electrónicos con terceros, sin aviso o consentimiento de la otra parte. Ambas partes reconocen que nada en este contrato será interpretado como (a) la formación de una sociedad o joint venture entre EL CERTIFICADOR y EL EMISOR; (b) la creación de un fideicomiso o relación fiduciaria similar entre el EL CERTIFICADOR y EL EMISOR; o (c) una relación de trabajo o laboral entre el EL CERTIFICADOR y sus empleados y EL EMISOR. Ninguna de las partes del presente contrato está autorizada para suscribir contratos, representar, otorgar garantías u obligarse de forma alguna en nombre de la otra parte, salvo que cuenten con autorización expresa y por escrito de la otra parte.
                    {"\n"}{"\n"}
                    12.	DEL INCUMPLIMIENTO: El incumplimiento por cualquiera de las partes a cualquiera de las obligaciones del presente contrato notificadas por escrito y no subsanadas en un plazo de treinta días, da derecho a la otra parte a proceder legalmente en contra de la otra y al reclamo de los daños y perjuicios que correspondan de conformidad con la ley.
                    {"\n"}{"\n"}
                    13.	BUENA FE: Cada una de las partes actuará de buena fe y utilizará prácticas de negociación justas al momento de tomar cualquier acción bajo o relacionada con el presente contrato, y no hará nada para impedir o obstaculizar los derechos de la otra parte.
                    {"\n"}{"\n"}
                    14.	PLAZO: Este contrato tendrá un plazo  INDEFINIDO, pudiendo cualquiera de las partes darlo por terminado en cualquier momento dando un aviso a la otra parte con una anticipación de una semanasesenta días. El vencimiento del plazo no afectará los honorarios causados antes de dicha fecha.  Los numerales 2, 4, 5, 6, 7, 9 y  10 continuarán vigentes con posterioridad al vencimiento del plazo del presente contrato por un plazo indefinido.
                    {"\n"}{"\n"}
                    15.	LEY APLICABLE: Este contrato se regirá por las leyes de la República de Guatemala y para efectos de su ejecución y para resolver cualquier disputa que surja en relación con el mismo las partes se someten a la competencia de los tribunales del departamento de Guatemala, República de Guatemala, para lo cual las partes señalan como  lugar para recibir notificaciones: CYBER ESPACIO, SOCIEDAD ANÓNIMA la --------------- de la ciudad de Guatemala, departamento de Guatemala; y EL EMISOR, la ------------------------------------------------------------, de la ciudad de Guatemala, República de Guatemala, teniéndose como válidas y bien hechas las notificaciones que se hagan en las direcciones señaladas, salvo que la otra parte reciba un aviso por escrito señalando un nuevo lugar para recibir notificaciones.
                    {"\n"}{"\n"}
                    16.	ACUERDO TOTAL: Este contrato sustituye cualquier acuerdo o contrato anterior a la presente fecha celebrado entre las partes del presente contrato en relación con servicios de certificación y almacenamiento de documentos tributarios electrónicos y constituye el acuerdo total entre las partes.
                    {"\n"}{"\n"}
                    17.	ACEPTACIÓN: Ambas partes aceptamos el contenido íntegro del presente Contrato y para ello dejamos sin efecto cualquier otro contrato, convenio o acuerdo relacionado con el objeto del mismo, en fe de lo cual lo aceptamos, ratificamos y firmamos en dos originales.
                    {"\n"}{"\n"}
                    </Text>
                </ScrollView>
                <View style={styles.buttonRow}>
                    {loading &&(
                        <ActivityIndicator visible={false} size='large' color='#26A657'  style={ {justifyContent: 'center'} }/>  
                    )}
                    {!loading && (
                        <TouchableOpacity onPress={acceptContract} style={styles.sectionTouch}>
                            <Icon
                                name="done"
                                color="#26A657"
                                size={50}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>   
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 2,
        backgroundColor: '#fff'
    },
    logoRow: {
        flex: 1,
        alignItems: 'center'
    },
    logo:{
		width: 250,
		height: 125,
        resizeMode: 'contain',
	},
    contentContainer: {
        flex: 4
    },
    viewLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#77D353',
        marginBottom: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default Contract;