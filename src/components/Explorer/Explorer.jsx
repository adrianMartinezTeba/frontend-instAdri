import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Explorer.scss';
import NavBar from '../NavBar/NavBar';
import { getAllPosts, resetPost } from '../../features/posts/postsSlice';
import { resetUser } from '../../features/users/usersSlice';
import { Link } from 'react-router-dom';

const Explorer = () => {
  const dispatch = useDispatch();
  const { posts, isSuccessPost } = useSelector((state) => state.posts);

  useEffect(() => {
    // Llamar a la acción para obtener todos los posts cuando el componente se monta
    dispatch(getAllPosts());

    // Resetear el estado de usuarios y posts cuando el componente se monta
    dispatch(resetUser());
    dispatch(resetPost());
  }, [dispatch]);

  return (
    <div className="explorer">
      <div className="explorer-container">
        {isSuccessPost && posts ? (
          <div className="explorer-posts">
            {posts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <p>{post.name}</p>
                <img
                  src={`http://localhost:8080/uploads/${post.image}`}
                  alt={post.name}
                />
                <p>Likes: {post.likes.length}</p>
              </Link>
            ))}
          </div>
        ) : (
          // Puedes agregar un mensaje de carga aquí si es necesario
          <p>Cargando posts...</p>
        )}
      </div>
      <div className="navBar-explorer">
        <NavBar />
      </div>
    </div>
  );
};

export default Explorer;
