import LeftSideBar from "./layout/LeftSideBar"
import axios from "axios";
import Main from "./layout/Main";
import { Routes, Route } from 'react-router-dom';
import LogIn from "./pages/login/LogIn";
import Register from "./pages/register/Register";


const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL

const App = () => {

  axios.defaults.baseURL = serverURL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  const menuWidth = {
    transitionProperty: "width, height",
    transitionTimingFunction: "ease-in-out",
    transitionDuration: "2s"
  }
  return (
    <div className="flex flex-row flex-1 text-black">
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <div
            style={menuWidth}
            className="flex flex-row flex-1 ">
            <LeftSideBar />
            <Main />
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
