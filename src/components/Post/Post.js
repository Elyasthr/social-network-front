import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFriendUser } from '../../actions/friendUser.actions';
import { deletePost, updatePost } from '../../actions/post.action';
import { isEmpty } from '../Utils';
import Like from './Like';
import PostMessage from './PostMessage';

const Post = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [msgUpdate, setMsgUpdate] = useState(false);
    const [msgShow, setMsgShow] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();  

    const seeFriendProfil = ()=>{
        dispatch(getFriendUser(post.posterId))
    };
    

    const msgDelete = ()=>{
        dispatch(deletePost(post._id))
    }

    const itemUpdate =  ()=>{
        if(msgUpdate){
            dispatch(updatePost(post._id, msgUpdate))
        }
        setIsUpdate(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
      }, [usersData])


  return (

     
    <div className='container card  col-5  my-lg-3' key={post._id}>
      {isLoading ? (
            <p>Sa charge</p>
        ) : ( 
        <div className='card-body'>
            <NavLink exact to='/friendprofil'>
                <div className="card-title" onClick={seeFriendProfil}>
                    {!isEmpty(usersData[0]) && usersData.map((user)=>{
                        if(user._id === post.posterId) return user.pseudo;
                        else return null
                    })}
                </div>
            </NavLink>

            {isUpdate === false && (
                <>
                <div className={userData._id === post.posterId ? "card-text py-4 px-lg-4 my-lg-2 border bg-secondary text-white" : "card-text py-4 px-lg-4 my-lg-2 border bg-light" }>{post.message}</div>
                </>
            )}
            {isUpdate === true && (
                <div className="card-text border bg-light ">
                    <textarea defaultValue={post.message} onChange={(e)=> setMsgUpdate(e.target.value)}/>
                    <button className="btn btn-primary btn-sm" onClick={itemUpdate}>Valider</button>
                </div>
            )}
            <div className="row px-lg-1 py-lg-1">
                <div className=".col-md-4 mr-auto">
                    <Like post={post}/>
                    <button className={msgShow ? "btn btn-outline-primary btn-sm mx-lg-1" : "btn btn-primary btn-sm mx-lg-1"} onClick={()=>setMsgShow(!msgShow)}>Commentaire {post.comments.length}</button>
                </div>
                <div className=".col-md-4 ml-auto ">
                    {userData._id === post.posterId && !userData.superuser && (
                        <>
                            <button className={isUpdate ? "btn btn-outline-primary btn-sm mx-lg-1" : "btn btn-primary btn-sm mx-lg-1"} onClick={()=> setIsUpdate(!isUpdate)}>Modifier</button>
                            <button className="btn btn-primary btn-sm mx-lg-1" onClick={msgDelete}>Supprimer</button>
                        </>
                    )}
                    {userData.superuser && (
                        <>
                            <button className={isUpdate ? "btn btn-outline-primary btn-sm mx-lg-1" : "btn btn-primary btn-sm mx-lg-1"} onClick={()=> setIsUpdate(!isUpdate)}>Modifier</button>
                            <button className="btn btn-primary btn-sm mx-lg-1" onClick={msgDelete}>Supprimer</button>
                        </>
                    )}
                </div>
            </div>
            <div>
                {msgShow && <PostMessage post={post} />}
            </div>
        </div>
        )}
      </div>

  )
}

export default Post;