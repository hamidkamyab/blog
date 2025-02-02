import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import axios from 'axios'
import routes from './routes'

import Home from './page/home/Home'
import Login from './page/login/Login'
import Register from './page/register/Register'
import CreateBlog from './page/blog/CreateBlog'
import ShowBlog from './page/blog/ShowBlog'
import MyBlog from './page/blog/MyBlog'
import EditBlog from './page/blog/EditBlog'
import Search from './page/search/Search'
import AuthRoute from './components/auth/AuthRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFound from './page/404/NotFound'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.post['Content-Type'] = "Application/json";
axios.defaults.headers.post['Accept'] = "Application/json";

function App() {
  return (
    <div className="App vh-100 d-flex flex-wrap align-items-start justify-content-center">
      <BrowserRouter>
        <div className="d-flex flex-wrap align-items-start justify-content-center w-100">
          <Header />
          <div className="main w-100">
            <Routes>
              <Route path={routes.home} element={<Home />} />

              <Route element={<AuthRoute />}>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<Register />} />
              </Route>

              <Route path={routes.singleBlog + ':id'} element={<ShowBlog />} />
              <Route path={routes.search} element={<Search />} />

              <Route element={<ProtectedRoute />} >
                <Route path={routes.createBlog} element={<CreateBlog />} />
                <Route path={routes.blog} element={<MyBlog />} />
                <Route path={routes.edit + ':id'} element={<EditBlog />} />
              </Route>

              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
