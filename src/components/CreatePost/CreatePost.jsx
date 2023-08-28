import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/posts/postsSlice';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.posts);

  const [postData, setPostData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(postData);
  }, [postData])
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setPostData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    await dispatch(createPost(postData));
  }
  return (
    <div>
      <h2>Crear un nuevo post</h2>
      <form enctype="multipart/form-data" onSubmit={handleCreatePost}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={postData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="description" value={postData.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
