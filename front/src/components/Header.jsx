import React, { useEffect, useState } from 'react'
import * as IO5 from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import routes from '../routes'
import Cookie from 'js-cookie'
import Swal from 'sweetalert2'

function Header() {
  const [name, setName] = useState(Cookie.get('name'))
  const [token, setToken] = useState(Cookie.get('token'))

  const handleExit = () => {
    Swal.fire({
      icon: 'question',
      title: 'آیا قصد خروج از حساب خود را دارید؟',
      showCancelButton: true,
      confirmButtonText: "بله!",
      confirmButtonColor:'#0097e6',
      cancelButtonText: 'خیر',
      cancelButtonColor:'#e84118'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookie.remove('name')
        Cookie.remove('token')
        Cookie.remove('id')
        setName(null)
        setToken(null)
      }
    })
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setName(Cookie.get('name'));
      setToken(Cookie.get('token'));
    };

    // گوش دادن به تغییرات
    window.addEventListener('storage', handleStorageChange);

    // پاکسازی گوش دادن به رویداد
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div id='header' className='w-100 navbar navbar-dark bg-dark mb-5'>
      <div className="container d-flex justify-content-between align-items-center">
        <nav className="right">
          <ul className='navbar-nav d-flex align-items-center flex-row gap-3 list-unstyled m-0 p-0' >
            <li className="nav-item">
              <NavLink to={routes.home} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoHomeSharp size={14} />
                <span className='pt-1'>خانه</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={routes.blog} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoAddCircle size={16} />
                <span>پست جدید</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={routes.comments} className="nav-link d-flex align-items-center gap-1">
                <IO5.IoChatboxEllipses size={16} />
                <span >دیدگاه ها</span>
              </NavLink>
            </li>

            {
              token ?
                (<li className="nav-item" onClick={handleExit}>
                  <span className="nav-link logout d-flex align-items-center gap-1" role='button'>
                    <IO5.IoLogOut size={18} />
                    <span>خروج</span>
                  </span>
                </li>)
                :
                (<>
                  <li className="nav-item">
                    <NavLink to={routes.login} className="nav-link d-flex align-items-center gap-1">
                      <IO5.IoLogIn size={16} />
                      <span>ورود</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">

                    <NavLink to={routes.register} className="nav-link d-flex align-items-center gap-1">
                      <IO5.IoPersonAddSharp size={14} />
                      <span className='pt-1'>ثبت نام</span>
                    </NavLink>
                  </li>
                </>)

            }

          </ul>
        </nav>
        <div className="left d-flex align-items-center gap-3 justify-content-end">
          {
            token &&
            <>
              <div className="welcome">
                <span className='text-decoration-underline'>{name}، خوش آمدید</span>
              </div>
              <div className="vr bg-white opacity-75" style={{ width: '1px' }}></div>
            </>
          }


          <div className="logo">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header