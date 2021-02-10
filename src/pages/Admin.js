import React from 'react';
import { useSelector} from 'react-redux';
import Home from '../pages/Home';

const Admin = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      {userData.superuser ? (
        <div>
          Page en construction
        </div>
      ):(
        <Home />
    )}
    </>
  )
}

export default Admin;