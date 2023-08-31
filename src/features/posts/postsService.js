import axios from "axios";

const API_URL = "http://localhost:8080";
const token = JSON.parse(localStorage.getItem("token"));
const headers = {
    'Content-Type': 'multipart/form-data', // Importante: Establecer el encabezado adecuado para el envío de archivos
    'Authorization': `${token}` // Asegúrate de que "token" sea la variable que contiene tu token JWT
  };
const getAllPosts = async () => {
    const res = await axios.get(`${API_URL}/posts/all`);
    return res.data;
};
const getPostById = async (id) => {
    const res = await axios.get(`${API_URL}/posts/byId/${id}`);
    return res.data;
};
const createPost = async (post) => {
    console.log(headers);
    const res = await axios.post(`${API_URL}/posts/create`, post,{ headers });
    
    return res.data;
}
const deletePost = async (id) => {
    const res = await axios.delete(`${API_URL}/posts/delete/${id}`, exercise);
    return res.data;
}
const postsService = {
createPost,
getAllPosts,
getPostById,
deletePost
};

export default postsService;