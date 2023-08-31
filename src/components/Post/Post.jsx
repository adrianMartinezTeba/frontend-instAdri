import React,{useEffect} from 'react';
import './Post.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../features/posts/postsSlice';
const Post = () => {
  const { isSuccess, isError, post } = useSelector((state) => state.posts);
  useEffect(() => {

  }, [post])
  return (
    <div className="post">
      <img src={post.image} alt={post.name} />
      <div className="post-content">
        <h3>{post.name}</h3>
        <p>{post.description}</p>
        <img src={`http://localhost:8080/uploads/${post.image}`} alt={post.name} />
        <span>❤️ {post.likes.length}</span>
      </div>
    </div>
  );
};

export default Post;
