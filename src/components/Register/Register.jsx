import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/users/usersSlice';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const { isSuccess, isError, user } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: imageFile,
    }));

    const imagePreviewURL = URL.createObjectURL(imageFile);
    setImagePreview(imagePreviewURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    if (isSuccess) {
      dispatch(reset());
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="registro">
      <h2>Registro</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>Imagen:</label>
        <input type="file" name="profileImage" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Vista previa de la imagen" />
        )}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
