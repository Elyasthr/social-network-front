import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { getUsers } from '../../actions/users.actions';
import { getPosts } from '../../actions/post.action';

const Log = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [signUpModal, setSignUpModal] = useState(false);  
    const [signInModal, setSignInModal] = useState(true); 
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.postReducer);
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getUsers());
            dispatch(getPosts())
          setLoadPost(false);
        }
    },[loadPost,dispatch])

    //Logique
    const gestModals = (e) => {
        
        if(e.target.id === "connection"){
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if(e.target.id === "inscription"){
            setSignInModal(true);
            setSignUpModal(false);
        }
    }
    //Rendu Visuel
    return (
        
        <div className="jumbotron">
            <h1 className="display-6">Bienvenue</h1>
            <hr className="my-6"></hr>
            <div className="row">
                    <p className='col'>Nombres d'incrit : {usersData.length}</p>
                    <p className='col'>Nombres de Post : {posts.length}</p>    
            </div>
    
            <div className="container col-5 my-lg-5">

                    {signUpModal && <SignUpForm/>}
                    {signInModal && <SignInForm/>}
    
                <div className="row justify-content-around">
                    <div className="col-4">
                        <button type="button" className="btn btn-outline-dark" onClick={gestModals} id="inscription">Se connecter</button>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-dark" onClick={gestModals} id="connection">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
               
            
        
    );
};

export default Log;