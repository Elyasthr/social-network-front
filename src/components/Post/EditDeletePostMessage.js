import React, { useState, useContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteMessage, editMessage } from '../../actions/post.action';
import { UidContext } from '../AppContext';

const EditDeletePostMessage = ({comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [msg, setMsg] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const gestEdit = (e)=>{
        e.preventDefault();

        if(msg){
            dispatch(editMessage(postId, comment._id, msg));
            setMsg('');
            setEdit(false);
        }
    }

    const gestDelete = ()=> dispatch(deleteMessage(postId,comment._id))

    useEffect(() => {
        const verifAuthor = () => {
            if (uid === comment.commenterId){
                setIsAuthor(true);
            }
        }
        verifAuthor();
        
    },[uid, comment.commenterId])
  return (
    <div>
      {isAuthor && edit === false && !userData.superuser && (
          <button className="btn btn-primary btn-sm mx-lg-1" onClick={()=>setEdit(!edit)}>Modifier</button>
      )}
      {userData.superuser && (
          <button className="btn btn-primary btn-sm mx-lg-1" onClick={()=>setEdit(!edit)}>Modifier</button>
      )}
      {isAuthor && edit && !userData.superuser && (
          <>
            <form action="" onSubmit={gestEdit} className="" >
                <label className="btn btn-primary btn-sm mx-lg-1" htmlFor='text' onClick={() => setEdit(!edit)}>Edition</label>
                <input type='text' name='text' onChange={(e) => setMsg(e.target.value)} defaultValue={comment.message} />
                <button className="btn btn-primary btn-sm mx-lg-1" type='submit'>Valider</button>
                <button className="btn btn-primary btn-sm mx-lg-1" onClick={gestDelete} >Supprimer</button>
            </form>

            <button className="btn btn-primary btn-sm mx-lg-1" onClick={()=>setEdit(!edit)}>Modifier</button>
          </>
      )}
      {edit && userData.superuser && (
          <>
            <form action="" onSubmit={gestEdit} className="" >
                <label className="btn btn-primary btn-sm mx-lg-1" htmlFor='text' onClick={() => setEdit(!edit)}>Edition</label>
                <input type='text' name='text' onChange={(e) => setMsg(e.target.value)} defaultValue={comment.message} />
                <button className="btn btn-primary btn-sm mx-lg-1" type='submit'>Valider</button>
                <button className="btn btn-primary btn-sm mx-lg-1" onClick={gestDelete} >Supprimer</button>
            </form>

            <button className="btn btn-primary btn-sm mx-lg-1" onClick={()=>setEdit(!edit)}>Modifier</button>
          </>
      )}
    </div>
  )
}

export default EditDeletePostMessage;