import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext';
import { useSelector } from 'react-redux';
import Profil from './Profil';
import UpdateFriendProfil from '../components/Profil/UpdateFriendProfil';



const FriendProfil = () => {
   
    const uid = useContext(UidContext);
    const friendUserData = useSelector((state) => state.friendUserReducer);

  return (
    <>
      {uid === friendUserData._id ? (
        <Profil/>
      ):(
        <UpdateFriendProfil/>
    )}
    </>
  )
}

export default FriendProfil;