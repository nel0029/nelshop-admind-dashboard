import LeftSideBar from "./layout/LeftSideBar"
import axios from "axios";
import Main from "./layout/Main";



const App = () => {
  axios.defaults.baseURL = 'https://globally-express.onrender.com';
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <div className="h-[100dvh] flex flex-row">
      <LeftSideBar />
      <Main />
    </div>
  )
}

export default App
