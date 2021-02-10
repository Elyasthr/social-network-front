import React, { useContext, useEffect, useState } from 'react';
import Log from '../components/Log'
import { UidContext } from '../components/AppContext';
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from '../components/Utils';
import Follow from '../components/Profil/Follow';
// import { NavLink } from 'react-router-dom';
// import { getFriendUser } from '../actions/friendUser.actions';



const MoreFriend = () => {
  const uid = useContext(UidContext);
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  
  const loadPost = ()=>{
    window.location.reload(true);
  }

  // const seeFriendProfil = (userId)=>{
  //   console.log("test :" + userId);
  //   dispatch(getFriendUser(userId))
  // };

  useEffect(()=>{
    const notFriendList = () => {
      let tab = [];
      usersData.map((user) => {
        if(user._id !== userData._id && !user.followers.includes(userData._id)){
          return tab.push(user._id);
        }
        return null 
      })
      tab.sort(() => 0.5 - Math.random());
      setFriends(tab);
    }
    
    if(!isEmpty(usersData[0]) && !isEmpty(userData._id)){
      notFriendList();
    }

    setIsLoading(false);

  },[isLoading, usersData,userData,dispatch])

  return (
    <>
      {uid ? (
        <div>
          {isLoading ? (<p>Plus d'amis à ajouter :(</p>): (
            <>
            <button className='btn btn-primary  col' onClick={loadPost}>Plus d'amis</button>
            <div className="row row-cols-1 row-cols-md-3">
              {friends && friends.map((friend)=>{
                
                for(let i=0; i < usersData.length; i++){
                  if(friend === usersData[i]._id){
                    return (
                      <div className="col mb-4" key={friend}>
                        <div className="card" >
                          <div className="card-body">
                            <div className="card-title">{usersData[i].pseudo}</div>
                            <h6 className="card-subtitle mb-2 text-muted">{usersData[i].followers.length} Abonnés</h6>
                            <p className="card-text">{usersData[i].presentation ? usersData[i].presentation : "pas de presentation..." }</p>
                            <Follow idToFollow={usersData[i]._id} />
                            <button className="btn btn-primary btn-sm mx-lg-2">Ignorer</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                } return null
              })}
            </div> 
          </>
          )}
        </div>
       
      ):(
        <div>
          <Log signin={false} signup={true}/>
        </div>
    )}
    </>
)}

export default MoreFriend;