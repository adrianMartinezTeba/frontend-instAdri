import React, { useEffect, useState } from 'react';
import './Profile.scss'; // Importa el archivo de estilos CSS correspondiente
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogged, reset } from '../../features/users/usersSlice';
import NavBar from '../NavBar/NavBar';

const Profile = () => {
  const dispatch = useDispatch();
  const { isSuccessUser, isErrorUser, isLoadingUser, userLogged } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  useEffect(() => {
    if (isSuccessUser) {
      dispatch(reset());
    }
  }, [isSuccessUser]);

  const [activeTab, setActiveTab] = useState('posts'); // Estado para gestionar la pestaña activa

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      {isErrorUser ? (
        <p>Ha habido un error al encontrar el usuario</p>
      ) : isLoadingUser ? (
        <p>Cargando...</p>
      ) : userLogged ? (
        <div>
          <div className="profile">
            <div className="profile-header">
              <img src={`http://localhost:8080/uploads/${userLogged.profileImage}`} alt={userLogged.username} />
              <div className="profile-info">
                <h1>{userLogged.name}</h1>
                <p>@{userLogged.username}</p>
                <button>Editar perfil</button>
              </div>
              <div className="profile-stats">
                <div
                  className={`stats-item ${activeTab === 'posts' ? 'active' : ''}`}
                  onClick={() => handleTabClick('posts')}
                >
                  <strong>{userLogged.posts.length}</strong> Publicaciones
                </div>
                <div
                  className={`stats-item ${activeTab === 'followers' ? 'active' : ''}`}
                  onClick={() => handleTabClick('followers')}
                >
                  <strong>{userLogged.followers.length}</strong> Seguidores
                </div>
                <div
                  className={`stats-item ${activeTab === 'following' ? 'active' : ''}`}
                  onClick={() => handleTabClick('following')}
                >
                  <strong>{userLogged.following.length}</strong> Siguiendo
                </div>
              </div>
            </div>
            <div className="profile-bio">
              <p>{userLogged.bio}</p>
            </div>
            <div className="profile-content">
              {activeTab === 'posts' && (
                <div className="profile-posts">
                  {userLogged.posts.map((post) => (
                    <div className="post" key={post._id}>
                      <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'followers' && (
                <div className="followers-list">
                  {userLogged.followers.map((follower) => (
                    <div className="follower" key={follower._id}>
                      <img src={`http://localhost:8080/uploads/${follower.profileImage}`} alt={follower.username} />
                      <p>{follower.username}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'following' && (
                <div className="following-list">
                  {userLogged.following.map((followingUser) => (
                    <div className="following-user" key={followingUser._id}>
                      <img src={`http://localhost:8080/uploads/${followingUser.profileImage}`} alt={followingUser.username} />
                      <p>{followingUser.username}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <NavBar />
    </div>
  );
};

export default Profile;
