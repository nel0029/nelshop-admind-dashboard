import LeftSideBar from "./layout/LeftSideBar"
import axios from "axios";
import Main from "./layout/Main";


const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL

const App = () => {

  axios.defaults.baseURL = serverURL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <div className="flex flex-row flex-1 text-black">
      <LeftSideBar />
      <Main />
    </div>
  )
}

export default App
