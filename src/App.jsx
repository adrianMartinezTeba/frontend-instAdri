import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Wellcome from "./components/Wellcome/Wellcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import Post from "./components/Post/Post";
import Explorer from "./components/Explorer/Explorer";
import User from "./components/User/User";
import SearUser from "./components/SearUser/SearUser";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wellcome/>}/>
          <Route path="/explorer" element={<Explorer/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/newPost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/searchUser" element={<SearUser/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
