import React, { useContext } from 'react';
import { useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);



    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-brand">
                {uid ? (
                    <NavLink exact to="/home">
                        <div className="monlogo">
                            <img src="./img/network.svg" width="30" height="30" className="d-inline-block align-top" alt="icon"/> Resaux Social
                        </div>
                    </NavLink>
                ):(
                    <NavLink exact to="/">
                        <div className="monlogo">
                            <img src="./img/network.svg" width="30" height="30" className="d-inline-block align-top" alt="icon"/> Resaux Social
                        </div>
                    </NavLink>
                )}
            </div>
            <div >
                {uid ? (
                    <ul className="nav">
                        {userData.superuser && ( 
                        <li className="nav-item">
                            <NavLink exact to="/admin">
                                <h5 className="nav-link">Admin</h5>
                            </NavLink>
                        </li>)}
                        <li className="nav-item">
                            <NavLink exact to="/morefriend">
                                <h5 className="nav-link">Plus D'Amis</h5>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/profil">
                                <h5 className="nav-link">Mon Profil</h5>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/about">
                                <h5 className="nav-link">A Propos</h5>
                            </NavLink>
                        </li>
                        <Logout/>
                    </ul>
                ):(
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink exact to="/about">
                            <h5 className="nav-link">A Propos</h5>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to='/profil'>
                                <h5 className="nav-link">Connexion</h5>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>  
  )
}

export default NavBar;