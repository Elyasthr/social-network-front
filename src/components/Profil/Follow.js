import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/user.actions';
import { isEmpty } from '../Utils';

const Follow = ({idToFollow}) => {
    const userData = useSelector((state)=>state.userReducer);
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();

    const gestFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollow(true);
    }

    const gestUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollow(false);
    }

    useEffect(() => {
        if(!isEmpty(userData.following)){
            if(userData.following.includes(idToFollow)){
                setIsFollow(true);
            }
            else{
                setIsFollow(false);
            }
        }

    },[userData, idToFollow])


  return (
    <>
        {isFollow &&  !isEmpty(userData) &&  idToFollow !== userData._id &&(
            <span onClick={gestUnfollow}>
                <button className="btn btn-primary btn-sm ">Se desabonner</button>
            </span>
        )}
        {isFollow === false && !isEmpty(userData) && idToFollow !== userData._id &&(
            <span onClick={gestFollow}>
            <button className="btn btn-outline-primary btn-sm">S'abonner</button>
        </span>
        )}
      
    </>
  )
}

export default Follow;