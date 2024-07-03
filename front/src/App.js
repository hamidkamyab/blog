import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'
import routes from './routes'

import Home from './page/home/Home'
import Login from './page/login/Login'
import Register from './page/register/Register'
import Blog from './page/blog/Blog'


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken=true;
axios.defaults.baseURL="http://127.0.0.1:8000/api/";
axios.defaults.headers.post['Content-Type'] = "Application/json";
axios.defaults.headers.post['Accept'] = "Application/json";

function App() {
  return (
    <div className="App vh-100 d-flex flex-wrap align-items-start justify-content-center">
      <BrowserRouter>
        <Header />
        <div className="main vw-100">
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.blog} element={<Blog />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
