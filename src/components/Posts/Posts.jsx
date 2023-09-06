import React, { useEffect } from 'react';
import './Posts.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getPostById } from '../../features/posts/postsSlice';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Posts = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { isSuccessPost, isErrorPost, posts, post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  
  }, []);
  useEffect(() => {
    console.log(posts);
  console.log(post);
  }, [posts,post]);
  
  return (
    <div className="posts">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`} className="post">
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
