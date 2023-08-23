import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Wellcome from "./components/Wellcome/Wellcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wellcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
        <NavBar/>
      </BrowserRouter>
    </>
  )
}

export default App
