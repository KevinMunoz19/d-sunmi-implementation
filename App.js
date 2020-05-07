
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Scene, Router, Stack, Tabs } from 'react-native-router-flux';
// import views
import Init from './src/views/Init';
import Welcome from './src/views/Welcome';
import ContractMessage from './src/views/ContractMessage';
import Dte from './src/views/Dte';
import FirstTimeForm from './src/views/FirstTimeForm';
import Contract from './src/views/Contract';
import Home from './src/views/Home';
import Login from './src/views/Login';
import Clients from './src/views/Clients';
import Client from './src/views/Client'
import Products from './src/views/Products';
import Product from './src/views/Product';
import Dtes from './src/views/Dtes';
import DtesSummary from './src/views/DtesSummary';
import InfoUser from './src/views/infoUser';

const App = () => {
  return (
    // <Router>
    // <Stack>
    // <Scene key="init" component={Init} hideNavBar={true} title="Inicio"/>
    // <Scene key="welcome" component={Welcome} hideNavBar={true} title="Bienvenida"/>
    // <Scene key="contractMessage" component={ContractMessage} hideNavBar={true} title="Contrato verificado"/>
    //
    // <Scene key="firstTimeForm" component={FirstTimeForm} hideNavBar={true} title="Formulario"/>
    // <Scene key="contract" component={Contract} hideNavBar={true} title="Contrato"/>
    // <Scene key="client" component={Client} hideNavBar={true} title="Client"/>
    // <Scene key="product" component={Product} hideNavBar={true} title="Product"/>
    // <Scene key="dtessummary" component={DtesSummary} hideNavBar={true} title="DtesSummary"/>
    // <Scene key="infouser" component={InfoUser} hideNavBar={true} title="InfoUser"/>
    //
    // <Scene key="login" component={Login} hideNavBar={true} title="Login"/>
    // 	<Scene key="root" hideNavBar>
    //     <Scene key='Tabbar' tabs={true} tabBarStyle={styles.tabBar} default='Main' tabBarPosition="bottom">
    //       <Scene key="home"  component={Home} hideNavBar={true} title="Home"/>
    //
    //       <Scene key="dte" component={Dte} hideNavBar={true} title="Dte"/>
    //       <Scene key="clients" component={Clients} hideNavBar={true} title="Client List"/>
    //
    //       <Scene key="products" component={Products} hideNavBar={true} title="Product List"/>
    //
    //       <Scene key="dtes" component={Dtes} hideNavBar={true} title="Dtes"/>
    //
    //     </Scene>
    // 	</Scene>
    // </Stack>
    // </Router>
    <Router>
    	<Scene key="root">
      <Scene key="init" component={Init} hideNavBar={true} title="Inicio"/>
      <Scene key="welcome" component={Welcome} hideNavBar={true} title="Bienvenida"/>
      <Scene key="contractMessage" component={ContractMessage} hideNavBar={true} title="Contrato verificado"/>
      <Scene key="dte" component={Dte} hideNavBar={true} title="Dte"/>
      <Scene key="firstTimeForm" component={FirstTimeForm} hideNavBar={true} title="Formulario"/>
      <Scene key="contract" component={Contract} hideNavBar={true} title="Contrato"/>
      <Scene key="home"  component={Home} hideNavBar={true} title="Home"/>
      <Scene key="login" component={Login} hideNavBar={true} title="Login"/>
      <Scene key="clients" component={Clients} hideNavBar={true} title="Client List"/>
      <Scene key="client" component={Client} hideNavBar={true} title="Client"/>
      <Scene key="products" component={Products} hideNavBar={true} title="Product List"/>
      <Scene key="product" component={Product} hideNavBar={true} title="Product"/>
      <Scene key="dtes" component={Dtes} hideNavBar={true} title="Dtes"/>
      <Scene key="dtessummary" component={DtesSummary} hideNavBar={true} title="DtesSummary"/>
      <Scene key="infouser" component={InfoUser} hideNavBar={true} title="InfoUser"/>
    	</Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  // tabBar: {
  //   height: 50,
  //   borderTopColor: 'darkgrey',
  //   borderTopWidth: 1,
  //   opacity: 0.98,
  //   justifyContent:'space-between'
  // }
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default App;
