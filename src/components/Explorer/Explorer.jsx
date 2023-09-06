import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Explorer.scss';
import NavBar from '../NavBar/NavBar.jsx';
import { getAllPosts } from '../../features/posts/postsSlice';
import { getUsers } from '../../features/users/usersSlice';
import { Link } from 'react-router-dom';
const Explorer = () => {
  const dispatch = useDispatch();
  const { users, isSuccessUser, isErrorUser } = useSelector((state) => state.users);
  const { posts, isSuccessPost, isErrorPost } = useSelector((state) => state.posts);
 const [orderedPosts,setOrderedPosts] = useState([]);
 const [orderedUsers,setOrderedUsers] = useState([]);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllPosts());
    
  }, []);

  useEffect(() => {

  }, [posts, users]);

  // Variables de estado para controlar qué lista mostrar
  const [showUsers, setShowUsers] = useState(true);
  const [showPosts, setShowPosts] = useState(false);

  // Funciones de manejo de eventos para cambiar el estado de las variables
  const showUsersList = () => {
    setShowUsers(true);
    setShowPosts(false);
  };

  const showPostsList = () => {
    setShowUsers(false);
    setShowPosts(true);
  };

  return (
    <div>
     
      <div className="explorer-buttons">
        <button onClick={showUsersList}>Mostrar Usuarios</button>
        <button onClick={showPostsList}>Mostrar Posts</button>
      </div>
      {showUsers && (
        <div className="explorer-users">
          {/* Renderiza la lista de usuarios */}
          {users.map((user) => (
            <Link key={user._id} to={`/user/${user._id}`}>
              <img src={`http://localhost:8080/uploads/${user.profileImage}`} alt={user.username} />
              <p>{user.username}</p>
              <p>{user.followers}</p>
              {/* Agrega más detalles del usuario según sea necesario */}
            </Link>
          ))}
        </div>
      )}
      {showPosts && (
        <div className="explorer-posts">
          {/* Renderiza la lista de posts */}
          {posts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <p>{post.name}</p>
              <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
              <p>Likes: {post.likes}</p>
              {/* Agrega más detalles del post según sea necesario */}
            </Link>
          ))}
        </div>
      )}
       <NavBar />
    </div>
  );
};

export default Explorer;
