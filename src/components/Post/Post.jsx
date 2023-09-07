import React, { useEffect, useState } from 'react';
import './Post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, reset, like, unLike } from '../../features/posts/postsSlice';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Post = () => {
  const { isLoadingPost, isErrorPost, post } = useSelector((state) => state.posts);
  const { userLogged } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [liked, setLiked] = useState(false); // Estado local para el like

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(reset());
      // Verifica si el usuario actual ha dado like en esta publicación
      setLiked(post.likes.includes(userLogged._id));
    }
  }, [post]);

  const handleLike = async() => {
    // Si el usuario ya ha dado like, deshazlo (unlike), de lo contrario, dale like
    if (liked) {
      await dispatch(unLike(post._id));
      setLiked(false)
    } else {
      await dispatch(like(post._id));
      setLiked(true)
    }
    // Actualiza el estado local de liked
  };

  return (
    <div>
      {isErrorPost ? (
        <p>Error al cargar el post</p>
      ) : isLoadingPost ? (
        <p>Cargando...</p>
      ) : post ? (
        <div className="post">
          <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
          <div className="post-content">
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            {/* Cambia el color del corazón según el estado de liked */}
            <span onClick={handleLike} style={{ color: liked ? 'red' : 'gray' }}>
              ❤️ {post.likes.length}
            </span>
          </div>
        </div>
      ) : null}
      <NavBar />
    </div>
  );
};

export default Post;
