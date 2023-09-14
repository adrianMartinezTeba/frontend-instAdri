import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unFollow, getUserById, reset, getUserLogged ,isFollowing} from '../../features/users/usersSlice';
import { Await, useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './User.scss';

const User = () => {
  const dispatch = useDispatch();
  const { userLogged, user, isSuccessUser, isErrorUser, isLoadingUser,isFollowingState } = useSelector((state) => state.users);
  const { id } = useParams();
  const [btnFollow, setBtnFollow] = useState(isFollowingState);

  useEffect(() => {
    dispatch(isFollowing(id));
    dispatch(getUserById(id));
    dispatch(getUserLogged());
  }, []);

 useEffect(() => {
   if (isFollowingState === true) {
    setBtnFollow(true);
   }else{
    setBtnFollow(false);
   }
   console.log(btnFollow);
 },[isFollowingState])
  const handleFollow = async () => {
    try {
      await dispatch(follow(user._id));
      setBtnFollow(!btnFollow);
    } catch (error) {
      console.error('Error al seguir al usuario', error);
    }
  }
  const handleUnFollow = async () => {
    try {
      await dispatch(unFollow(user._id));
      setBtnFollow(!btnFollow);
    } catch (error) {
      console.error('Error al dejar de seguir al usuario', error);
    }
  }
useEffect (()=> {
  if (isSuccessUser) {
    dispatch(reset());  
  }
},[isSuccessUser])
  return (
    <div className="user-profile">
      {isErrorUser ? (
        <p>Ha habido un error al encontrar el usuario</p>
      ) : isLoadingUser ? (
        <p>Cargando...</p>
      ) : user ? (
        <div>
          <div className="profile-header">
            <img src={`http://localhost:8080/uploads/${user.profileImage}`} alt={user.username} />
            <h1>{user.name}</h1>
            <p>@{user.username}</p>
          </div>
          <div className="profile-bio">
            <p>{user.bio}</p>
          </div>
          <div className="profile-stats">
            <div className="stats-item">
              <strong>{user.posts?.length}</strong> Publicaciones
            </div>
            <div className="stats-item">
              <strong>{user.followers?.length}</strong> Seguidores
            </div>
            <div className="stats-item">
              <strong>{user.following?.length}</strong> Siguiendo
            </div>
          </div>
          {
            btnFollow === true ? (
              <button onClick={() => (handleUnFollow(user._id))}>
                Unfollow
                </button>
            ) : (
              <button onClick={() => (handleFollow(user._id))}>
                Follow
              </button>
            )
          }
          {/* <button onClick={() => (btnFollow ? handleUnFollow(user._id) : handleFollow(user._id))}>
            {btnFollow  ? 'Unfollow' : 'Follow'}
          </button> */}
        </div>
      ) : null}
      <NavBar />
    </div>
  );
};

export default User;
