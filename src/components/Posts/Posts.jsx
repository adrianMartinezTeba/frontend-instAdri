import React, { useEffect } from 'react';
import './Posts.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getPostById } from '../../features/posts/postsSlice';
import { Link } from 'react-router-dom';

const Posts = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, posts, post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  
  }, []);
  useEffect(() => {
    console.log(posts);
  
  }, [posts]);
  const handlePost = async (id) => {
    await dispatch(getPostById(id));

  };

  return (
    <div className="posts">
      {posts.map((post) => (
        <Link key={post._id} to="/post" className="post" onClick={() => handlePost(post._id)}>
          <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
          <div className="post-content">
            <h3>{post.name}</h3>
            <p>{post.description}</p>
            <span>❤️ {post.likes.length}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
