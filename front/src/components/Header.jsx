import React from 'react'
import * as IO5 from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <div id='header' className='w-100 navbar navbar-dark bg-dark mb-5'>
      <div className="container d-flex justify-content-between align-items-center">
        <nav className="right">
          <ul className='navbar-nav d-flex align-items-center flex-row gap-3 list-unstyled m-0 p-0' >
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoHomeSharp size={14} />
                <span className='pt-1'>خانه</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoLogIn size={16} />
                <span>ورود</span>
              </NavLink>
            </li>
            <li className="nav-item">

              <NavLink to={"/register"} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoPersonAddSharp size={14} />
                <span className='pt-1'>ثبت نام</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link logout d-flex align-items-center gap-1" role='button'>
                <IO5.IoLogOut  size={16} />
                <span>خروج</span>
              </span>
            </li>
          </ul>
        </nav>
        <div className="left d-flex align-items-center gap-3 justify-content-end">
          <div className="welcome">
            <span className='text-decoration-underline'>حمید کامیاب، خوش آمدید</span>
          </div>
          <div className="vr bg-white opacity-75" style={{ width: '1px' }}></div>
          <div className="logo">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header