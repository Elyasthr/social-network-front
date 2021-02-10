import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.action';
import { isEmpty } from '../Utils';
import Post from './Post'

const Actu = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.postReducer);
    const userData = useSelector((state) => state.userReducer);

    const reloadPost = () => {
        if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if (loadPost) {
          dispatch(getPosts());
          setLoadPost(false);
        }
    

    window.addEventListener('scroll', reloadPost);
        return ()=> window.removeEventListener('scroll', reloadPost)
    },[loadPost, dispatch])

  return (
    <div className="container">
          {!isEmpty(posts[0]) && !isEmpty(userData) && !userData.superuser && posts.map((post)=>{
              
              for(let i=0; i < userData.following.length + 1; i++){
                if(post.posterId === userData.following[i] || post.posterId === userData._id)
                    return <Post post={post} key={post._id}/>;
              }return null;
          })}

          {!isEmpty(posts[0]) && !isEmpty(userData) && userData.superuser && posts.map((post)=>{
                    return <Post post={post} key={post._id}/>;
          })}
    </div>
  )
}

export default Actu;