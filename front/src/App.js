import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/home/Home'
import Login from './page/login/Login'
import Register from './page/register/Register'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App vh-100 d-flex flex-wrap align-items-start justify-content-center">
      <BrowserRouter>
        <Header />
        <div className="main vw-100">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
