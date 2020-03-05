import React,{useState} from 'react';

import DB from './DB';

const useUser = (callback) => {

    const {select,insert} = DB();

    const setUserInfo = ({contactName,id,nation,job,certificate,cellphone,email,logo})=>{
        var query = `
            UPDATE users set contact_name = ?,document_id = ?,
            nationality = ?,profession = ?,certificate=?,
            phone = ? ,email=?,logo=?,first_login=? where is_logged = ?;
        `;
        insert(query,[contactName,id,nation,job,certificate,cellphone,email,logo,0,1],(result)=>{
            console.log('result contract',result);
        })
    }
    const setUser = (user,cb) =>{
        var {name,token,nit,stringNit} = user; 
        var validate = `SELECT * FROM users  where name = ? AND string_nit = ?`;
        select(validate,[name,stringNit],(exist)=>{
            if(exist.length > 0){
                var query = `update users set is_logged = ? where name = ? AND string_nit = ?;`;
                var fields = [1,name,stringNit];
                insert(query,fields,(result)=>{
                    select('select * from users where is_logged = ?',[1],(userInfo)=>{
                        cb(userInfo[0])
                    })
                });
            }else{
                var query = `INSERT INTO users(name,token,nit,string_nit,is_logged) VALUES(?,?,?,?,?);`;
                var fields = [name,token,nit,stringNit,1];
                insert(query,fields,(result)=>{
                    select('select * from users where is_logged = ?',[1],(userInfo)=>{
                        cb(userInfo[0])
                    })
                });
            }
        })
        
    }

    const removeUser = () =>{
        var query = `DELETE FROM USERS`;
        insert(query,[],(result)=>{
			console.log('result');
		});
    }

    const logout = ()=>{
        var query = `UPDATE USERS SET is_logged = 0`;
        insert(query,[],(result)=>{
			console.log('result');
		});
    }

    getUser = (cb)=>{
        var query = `SELECT * from users where is_logged = ?`;
        select(query,[1],(users)=>{
            cb(users[0]);
        })
    }

    confirmContract = ()=>{
        var query = `update users set confirm_contract = ? where is_logged = ?`;
        insert(query,[1,1],(result)=>{
            console.log(result);
        })
    }

    return {
        setUser,
        setUserInfo,
        getUser,
        removeUser,
        logout,
        confirmContract
	};

}

export default useUser;