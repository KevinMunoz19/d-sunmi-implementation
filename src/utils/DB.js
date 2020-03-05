import React,{useState} from 'react';
import {Platform} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

var conn = null;
if(Platform.OS == 'ios'){
    var conn = SQLite.openDatabase({name:'example.db',createFromLocation:1},(ok)=>{
        console.warn('connect db ok 1 ');
    },
    (error)=>{
        console.warn('error', error);
    })
}else{

    var conn = SQLite.openDatabase({name:'test.db',createFromLocation:'~example.db'},(ok)=>{
        console.warn('connect db ok');
    },
    (error)=>{
        console.warn('error', error);
    })
}
// var conn = SQLite.openDatabase({name:'test.db',createFromLocation:'~example.db'},(ok)=>{
// 	console.warn('connect db ok');
// },
// (error)=>{
// 	console.warn('error', error);
// })

// SQLite.openDatabase({name : "testDB", createFromLocation : 1}, okCallback,errorCallback);
// var conn = SQLite.openDatabase({name:'example.db',createFromLocation:1},(ok)=>{
// 	console.warn('connect db ok 1 ');
// },
// (error)=>{
// 	console.warn('error', error);
// })

const DB = ()=>{

    const select = (query,params,cb)=>{
        conn.transaction((tr)=>{
			tr.executeSql(query,params,(tr,results)=>{
                var rows = [];
                for(var i = 0;i<results.rows.length;i++){
                    rows.push(results.rows.item(i));
                }
                cb(rows);
			},(err)=>{
                console.warn('error haciendo el select',err)
            })
		})
    }

    const insert = (query,params,cb)=>{
        conn.transaction((tr)=>{
			tr.executeSql(query,params,(tr,results)=>{
                cb(true);
			},(err) => {
                cb(false),
                console.warn(err);
            })
		})
    }

    return {
        select,
        insert
    }
}

export default DB;