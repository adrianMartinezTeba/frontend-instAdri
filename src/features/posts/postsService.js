import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllPosts = async () => {
    const res = await axios.get(`${API_URL}/posts/all`);
    return res.data;
};
const getPostsById = async (id) => {
    const res = await axios.get(`${API_URL}/posts/byId/${id}`);
    return res.data;
};
const createPost = async (post) => {
    const res = await axios.post(`${API_URL}/posts/create`, post, 
    {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante: Establecer el encabezado adecuado para el envío de archivos
        },
      }
      );
    return res.data;
}
const deletePost = async (id) => {
    const res = await axios.delete(`${API_URL}/posts/delete/${id}`, exercise);
    return res.data;
}
const postsService = {
createPost,
getAllPosts,
getPostsById,
deletePost
};

export default postsService;