import React, { useState,  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.action';

const NewPost = () => {
  const [message, setMessage] = useState('');
  const userData = useSelector((state)=> state.userReducer);
  const dispatch = useDispatch();

  const loadPost = ()=>{
    window.location.reload(true);
}
  const gestPost = async ()=>{
    if(message){
        
        await dispatch(addPost(userData._id,message));
        dispatch(getPosts());
        cancelPost();
    }
    else{
        alert('Champs vide ecrivez un message !')
    }
  }

  const cancelPost = ()=>{
    setMessage('');
    }

  return (
      <div className="container card col-6 px-lg-4 py-lg-4">
        <NavLink exact to='/profil'>
        <h3 className="display-6">{userData.pseudo}</h3>
        </NavLink>
        <div>
            <textarea className="form-control" name="message" id="message" placeholder="Publier un nouveau Post ?" onChange={(e)=> setMessage(e.target.value)} value={message}/>
        </div>
        <div className='row'>
            {message && (<button className='btn btn-outline-primary mx-lg-2 my-lg-2 col-2' onClick={cancelPost}>Annuler</button>)}
            <button className='btn btn-primary mx-lg-2 my-lg-2 col-5' onClick={gestPost}>Publier</button>
            <button className='btn btn-primary mx-lg-2 my-lg-2 col-5' onClick={loadPost}>Recharger les nouvelles publications</button>
        </div>
        
    </div>
  )
}

export default NewPost;