import React, { useContext } from 'react'
import Actu from '../components/Post/Actu';
import Log from '../components/Log'
import { UidContext } from '../components/AppContext';
import NewPost from '../components/Post/NewPost';


const Home = () => {
  const uid = useContext(UidContext);
  

  return (
    <>
      {uid ? (
        <div className="root">
          <div className="jumbotron">
            <NewPost/>
          </div>
          
            <Actu/>
          
        </div>
      ):(
      
        <div>
            <Log signin={false} signup={true}/>
        </div>
    )}
    </>
)}

export default Home;
