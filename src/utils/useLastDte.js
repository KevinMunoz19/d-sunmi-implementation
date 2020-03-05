import React,{useState} from 'react';
import useApi from './useApi';
import base64 from 'react-native-base64';
var DOMParser = require('xmldom').DOMParser;
import DB from './DB';


const useLastDte = () => {

  const [dteList,setDteList] = useState([]);
  const {insert} = DB();
  const {select} = DB();




  const getLastDte = (res,rej) => {
    var dataDte = ``;
    var query = `select * from dte where id=(select max(id) from dte)`;
    select(query,[],(dtes)=>{
        setDteList(dtes);
    })
    .then(response => {
      return dteList;
    }).catch(err => {
      rej(err);
    })

  }

  return {
    getLastDte,
  };


}

export default useLastDte;
