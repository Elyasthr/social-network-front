import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, getPosts } from '../../actions/post.action';
import EditDeletePostMessage from './EditDeletePostMessage';
//import { isEmpty } from '../Utils';

const PostMessage = ({post}) => {
    const [msg, setMsg] = useState('');
    
    //const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const gestMsg = (e) =>{
        e.preventDefault();
        if(msg){
            dispatch(addMessage(post._id, userData._id, msg, userData.pseudo))
                .then(()=> dispatch(getPosts()))
                .then(() => setMsg(''));
        }
    }



    return (
        <>
        {post.comments.map((comment)=>{
                return (
                        <div className={comment.commenterId === userData._id ? "card-text px-lg-4 py-lg-2 mx-lg-5 my-lg-2 border bg-secondary text-white" : "card-text px-lg-4 py-lg-2 mx-lg-5 my-lg-2 border bg-light"} key={comment._id}>
                            <div className="card-title">{comment.commenterPseudo}</div>
                            <p>{comment.message}</p>
                            <EditDeletePostMessage comment={comment} postId={post._id} />
                        </div>
                )
        })}
        <div className="">
            <form action="" onSubmit={gestMsg} className="">
                <input type="text" name="text" onChange={(e) => setMsg(e.target.value)} value={msg} placeholder="Ecrire un commentaire..." />
                <button type="submit" className="btn btn-primary btn-sm  ">Envoyer</button>
            </form>
        </div>
        </>
        
    )
}

export default PostMessage;