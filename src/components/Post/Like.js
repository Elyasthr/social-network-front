import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.action';
import { UidContext } from '../AppContext';

const Like = ({post}) => {
    const [isLike, setIslike] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    

    const like = ()=>{
        dispatch(likePost(post._id, uid));
        setIslike(true);
    }

    const unLike = ()=>{
        dispatch(unlikePost(post._id, uid));
        setIslike(false);
    }

    useEffect(()=>{
        if(post.likers.includes(uid)) setIslike(true);
        else setIslike(false);
    },[uid, post.likers, isLike])//condition quand on va retester sa
        
    return (
        
        <>
            {uid && isLike === false && (
                <button className="btn btn-primary btn-sm mx-lg-1" onClick={like}>J'aime {post.likers.length}</button>
            )}
            {uid && isLike && (
                <button className="btn btn-outline-primary btn-sm mx-lg-1" onClick={unLike}>J'aime pas {post.likers.length}</button>
            )}
        </>
    )
}

export default Like;