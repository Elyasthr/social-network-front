import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import Post from '../Post/Post';
import { isEmpty } from '../Utils';
import Follow from '../Profil/Follow';
import { getPosts } from '../../actions/post.action';

const UpdateFriendProfil = () => {
    
    const [loadPost, setLoadPost] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);//verif pour comparation
    const friendUserData = useSelector((state) => state.friendUserReducer);
    const posts = useSelector((state)=>state.postReducer);
    const [followingList, setFollowingList] = useState(false);
    const [followersList, setFollowersList] = useState(false);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (loadPost) {
          dispatch(getPosts());
          setLoadPost(false);
        }
    },[loadPost,friendUserData, dispatch])
    
    
    
    return (
        <>
        <div className="jumbotron">
            <h1 className="display-6">Profil de {friendUserData.pseudo}</h1>
            <hr className="my-6"></hr>
            <div className="row">
                <div className="col-sm-6">
                    <h3>La Presentation</h3>
                    <p className="box" >{friendUserData.presentation}</p>
                </div>
                <div >
                    <h5 className=" btn-primary btn-lg" onClick={()=>{setFollowingList(true); setFollowersList(false)}}>Abonnements : {friendUserData.following ? friendUserData.following.length : ""}</h5>
                    <h5 className=" btn-primary btn-lg" onClick={()=>{setFollowersList(true); setFollowingList(false)}}>Abonnés : {friendUserData.followers ? friendUserData.followers.length : ""}</h5>
                </div>
                <div>
                    {followingList && (
                        <div className="malist">
                            <h3>Abonnements</h3>
                            <span onClick={()=>{setFollowingList(false)}} className="croix">&#10005;</span>
                            <ul>
                                {usersData.map((user) => {
                                    for(let i=0; i < friendUserData.following.length; i++){
    
                                        if (user._id === friendUserData.following[i]){
                                            
                                            return (
                                                <li key={user._id}>
                                                    <h4>{user.pseudo}</h4>
                                                    <Follow idToFollow={user._id} />
                                                </li>
                                            );
                                            
                                        }
                                    }
                                    return null
                                    
                                })}
                            </ul>
                        </div>
                    )}
                    {followersList && (
                        <div className="malist">
                            <h3>Abonnements</h3>
                            <span onClick={()=>{setFollowersList(false)}} className="croix">&#10005;</span>
                            <ul>
                                {usersData.map((user) => {
                                    
                                    for(let i=0; i < friendUserData.followers.length; i++){
    
                                        if (user._id === friendUserData.followers[i]){
                                            
                                            return (
                                                <li key={user._id}>
                                                    <h4>{user.pseudo}</h4>
                                                    <Follow  idToFollow={user._id} />
                                                </li>
                                            );
                                            
                                        }
                                    }
                                    return null
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div>
            <div className="container">
                {!isEmpty(posts[0]) && posts.map((post)=>{
                        if(post.posterId === friendUserData._id)
                            return <Post post={post} key={post._id}/>;
                        return null
                    }
                )} 
            </div>
        </div>
        </>
    )
}

export default UpdateFriendProfil;