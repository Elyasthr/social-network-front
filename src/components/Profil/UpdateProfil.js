import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../actions/post.action';
import { updatePresentation } from '../../actions/user.actions';
import Post from '../Post/Post';
import { isEmpty } from '../Utils';
import Follow from './Follow';

const UpdateProfil = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [presentation, setPresentation] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const posts = useSelector((state)=>state.postReducer);
    const dispatch = useDispatch();
    const [followingList, setFollowingList] = useState(false);
    const [followersList, setFollowersList] = useState(false);

    
    const gestUpdate = () => {
        dispatch(updatePresentation(userData._id, presentation));
        setUpdateForm(false);
    }

    useEffect(() => {
        if (loadPost) {
          dispatch(getPosts());
          setLoadPost(false);
        }
    },[loadPost, dispatch])
    
    return (
        <>
        <div className="jumbotron">
            <h1 className="display-6">Profil de {userData.pseudo}</h1>
            <hr className="my-6"></hr>
            <div className="row">
                <div className="col-sm-6">
                    <h3>La Presentation</h3>
                    {updateForm === false && (
                        <>
                            <p className="box"  onClick={() => setUpdateForm(!updateForm)}>{userData.presentation}</p>
                            
                            <button className="btn btn-primary btn-lg" onClick={() => setUpdateForm(!updateForm)}>Modifier</button>
                        </>
                    )}
                    {updateForm && (
                        <>
                            <textarea className="form-control" type='text' defaultValue={userData.presentation} onChange={(e) => setPresentation(e.target.value)}/>
                            <br/>
                            <button className="btn btn-primary btn-lg" onClick={gestUpdate}>Valider</button>
                        </>
                    )}
                </div>
                <div >
                    <h5 className=" btn-primary btn-lg" onClick={()=>{setFollowingList(true); setFollowersList(false)}}>Abonnements : {userData.following ? userData.following.length : ""}</h5>
                    <h5 className=" btn-primary btn-lg" onClick={()=>{setFollowersList(true); setFollowingList(false)}}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
                </div>
                <div>
                    {followingList && (
                        <div className="malist">
                            <h3>Abonnements</h3>
                            <span onClick={()=>{setFollowingList(false)}} className="croix">&#10005;</span>
                            <ul>
                                {usersData.map((user) => {
                                    for(let i=0; i < userData.following.length; i++){
    
                                        if (user._id === userData.following[i]){
                                            
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
                                    
                                    for(let i=0; i < userData.followers.length; i++){
    
                                        if (user._id === userData.followers[i]){
                                            
                                            return (
                                                
                                                    <li key={user._id}>
                                                        <h4 >{user.pseudo}</h4>
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
                        if(post.posterId === userData._id)
                            return <Post post={post} key={post._id}/>
                        return null
                    
                })}
            </div>
        </div>
        </>
    )
}

export default UpdateProfil;