import React, { useEffect } from 'react';
import './Post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, reset } from '../../features/posts/postsSlice';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { isLoading, isError, post } = useSelector((state) => state.posts);
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
      {isError ? (
        <p>Error al cargar el post</p>
      ) : isLoading ? (
        <p>cargaabdi</p>
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
    </div>
  );
};

export default Post;
