import React, { useEffect } from 'react';
import './Post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, reset } from '../../features/posts/postsSlice';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
const Post = () => {
  const { isLoadingPost, isErrorPost, post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostById(id));
  
  }, [dispatch, id]); // Incluye 'isSuccess' en las dependencias
useEffect(()=>{
if (post) {
  dispatch(reset());
}
},[post])
  return (
    <div>
      {isErrorPost ? (
        <p>Error al cargar el post</p>
      ) : isLoadingPost ? (
        <p>cargando</p>
      ) : post ? (
        <div className="post">
          <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
          <div className="post-content">
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            <span>❤️ {post.likes.length}</span>
          </div>
        </div>
      ) : null}
      <NavBar/>
    </div>
  );
};

export default Post;
