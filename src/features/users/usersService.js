import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const url = `${API_URL}/users/register`;
  const headers = {
    'Content-Type': 'multipart/form-data', // Set the content type for file uploads
    // Add any other custom headers here
  };
  try {
    const res = await axios.post(url, userData,{headers});
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, userData);
    const { user, token } = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    return res.data;
  } catch (error) {
    // handle error
  }
};
const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await fetch(`${API_URL}/users/logout`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  });
  if (response.ok) {
    localStorage.clear();
  }
  return response.json();
};

const getUserLogged = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(`${API_URL}/users/userLog`, {
    headers: {
      authorization: token,
    },
  });
  return res.data;
};
const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users/all`);
  return res.data;
}
const follow = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    'Authorization': token // Add 'Bearer' prefix to the token
};
  const res = await axios.post(`${API_URL}/users/follow/${userId}`,{},{headers});
  return res.data;
};
const unFollow = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    'Authorization': token // Add 'Bearer' prefix to the token
};
  const res = await axios.delete(`${API_URL}/users/unfollow/${userId}`,{headers});
  return res.data;
}
const getUserById = async (userId) => {
  const res = await axios.get(`${API_URL}/users/user/${userId}`);
  return res.data
}
const getByName = async (name) => {
  const res = await axios.get(`${API_URL}/users/byName/${name}`);
  console.log(res.data);
  return res.data
}
const isFollowing = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const headers = {
    'Authorization': token // Add 'Bearer' prefix to the token
}
const res = await axios.get(`${API_URL}/users/isFollowing/${userId}`,{headers});
return res.data
}
const usersService = {
  register,
  login,
  logout,
  getUserLogged,
  follow,
  unFollow,
  getUsers,
  getUserById,
  getByName,
  isFollowing

};

export default usersService;