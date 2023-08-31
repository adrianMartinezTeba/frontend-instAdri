import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/posts/postsSlice';
import './CreatePost.scss';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.posts);

  const [postData, setPostData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa de la imagen

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setPostData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));

    // Crear URL de la imagen para la vista previa
    const imagePreviewURL = URL.createObjectURL(imageFile);
    setImagePreview(imagePreviewURL);
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    await dispatch(createPost(postData));
  };

  return (
    <div className="create-post">
      <h2>Crea un nuevo post</h2>
      <form encType="multipart/form-data" onSubmit={handleCreatePost}>
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" name="name" value={postData.name} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Descripción:</label>
          <textarea name="description" value={postData.description} onChange={handleInputChange}></textarea>
        </div>
        <div className="input-group">
          <label>Imagen:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>
        {imagePreview && <img src={imagePreview} alt="Vista previa de la imagen" />}
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
