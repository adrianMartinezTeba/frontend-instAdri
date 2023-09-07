import axios from "axios";

const API_URL = "http://localhost:8080";

const getAllPosts = async () => {
    const res = await axios.get(`${API_URL}/posts/all`);
    return res.data;
};
const getPostById = async (id) => {
    const res = await axios.get(`${API_URL}/posts/byId/${id}`);
    return res.data;
};
const createPost = async (post) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token // Add 'Bearer' prefix to the token
    };
    console.log('Sending request to API...');
    const res = await axios.post(`${API_URL}/posts/create`, post, { headers });
    console.log('Response received from API:', res.data);
    
    return res.data;
}
const deletePost = async (id) => {
    const res = await axios.delete(`${API_URL}/posts/delete/${id}`, exercise);
    return res.data;
}
const like = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
        Authorization: token
    };
    const res = await axios.post(`${API_URL}/posts/like/${id}`,{},{headers});
    return res.data;
}
const unLike = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
        Authorization: token
    }
    const res = await axios.delete(`${API_URL}/posts/unLike/${id}`,{headers});
    return res.data;
}
const postsService = {
createPost,
getAllPosts,
getPostById,
deletePost,
like,
unLike
};

export default postsService;