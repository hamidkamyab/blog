import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes'
import * as IO5 from 'react-icons/io5'
import notFound from '../../assets/img/404.svg'

function NotFound() {
  return (
    <div id="notFound" className='container d-flex flex-column justify-content-center align-items-center gap-3 mt-3'>
      <div className="imgBox col-10 text-center" >
        <img src={notFound} alt="" />
      </div>
      <div className="title d-flex flex-column align-items-center gap-3">
        <h4 className='m-0 p-0'>صفحه مورد نظر یافت نشد :(</h4>
        <Link to={routes.home} className='btn btn-outline-dark btn-sm px-3 d-flex align-items-center gap-2' >
            <span>خانه</span>
            <IO5.IoArrowBack />
        </Link>
      </div>
    </div>
  )
}

export default NotFound
