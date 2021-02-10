import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {
    const  removeCookie = (key)=>{
        //si il se passe quelque chose sur la fenetre par securité
        if(window !== "undefined"){
            cookie.remove(key, {expires: 1});
        }
    }
    const logout = async ()=>{
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        }).then(()=> removeCookie('jwt')).catch((err)=> console.log(err))

        window.location = "/";
    }
  return (
    <li className="nav-item" onClick={logout}>
        <h5 className="nav-link">Deconnexion</h5>
    </li>
  )
}

export default Logout;