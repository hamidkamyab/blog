import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as IO5 from 'react-icons/io5'
import * as FI from "react-icons/fi";
import * as BS from "react-icons/bs";
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { ad_to_jalali } from '../../helper';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';

function MyBlog() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const user_id = Cookie.get('user_id')
  const getBlogs = async () => {
    setIsLoading(true)
    await axios.get(`blog/${user_id}`)
      .then((response) => {
        setIsLoading(false)
        setError(false)
        if (response.data.status == 200) {
          setBlogs(response.data.blog)
        }
      })
      .catch(() => {
        setIsLoading(false)
        setError(true)
      })
  }

  const delBlog = (id) => {
    Swal.fire({
      icon: 'question',
      title: 'آیا مطمئنی؟',
      text: 'شما در حال حذف یک پست می باشید',
      showCancelButton: true,
      confirmButtonText: 'ادامه بده',
      cancelButtonText: 'لغو عملیات',
      confirmButtonColor:'#379728',
      cancelButtonColor:'#c23616'
    }).then(async (result) => {

      if (result.isConfirmed) {

        await axios.delete(`/blog/${id}`)
          .then(response => {
            if (response.data.status === 200) {
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                confirmButtonText: 'متوجه شدم'
              })
            }
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'عملیات با خطا مواجه شد',
              text: 'ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.',
              confirmButtonText: 'متوجه شدم'
            })
          })
      }

    })
  }

  useEffect(() => {
    return () => {
      getBlogs()
    };
  }, []);

  return (
    <div id="myBlog" className='align-self-start pt-3'>
      <div className="header d-flex flex-column align-items-center gap-3 pt-2">
        <h4 className='text-center'>پست های ارسالی شما</h4>
      </div>

      <div className="container d-flex flex-wrap">
        {
          !isLoading ?
            error ?
              <div className="error d-flex flex-column align-items-center justify-content-start gap-2 py-4 col-12">
                <h6 className='text-decoration-underline text-muted'>
                  <FI.FiAlertTriangle size={18} className='me-2' />
                  ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.
                </h6>
                <button className='btn btn-outline-dark btn-sm' onClick={getBlogs}>
                  <IO5.IoReload size={16} />
                  <span className='ms-1'>تلاش مجدد</span>
                </button>
              </div>
              :
              blogs.map((blog, index) => (

                <div className="blog-item col-4 p-3 d-flex" key={index}>
                  <div className="blog-box border border-1 d-flex flex-wrap align-items-start justify-content-center">
                    <div className="top">
                      <div className="imageBlog">
                        <img src={`http://127.0.0.1:8000/uploads/blog/${blog.image}`} alt="" />
                      </div>
                      <div className="contentBlog p-2">
                        {
                          blog.title.length > 38 ?
                            <h6 className='blog-title'>{blog.title.substring(0, 38) + '...'}</h6>
                            :
                            <h6 className='blog-title'>{blog.title}</h6>
                        }
                        {
                          blog.description.length > 92 ?
                            <p className='blog-description p-0 m-0'>{blog.description.substring(0, 92) + '...'}</p>
                            :
                            <p className='blog-description p-0 m-0'>{blog.description}</p>
                        }
                      </div>
                    </div>
                    <div className="bottom align-self-end p-2 w-100">
                      <hr className='my-1' />
                      <div className="details d-flex justify-content-between align-items-center my-1 mt-2">
                        <div className="oprate d-flex gap-2 align-items-center">
                          <Link to={routes.singleBlog + blog.id} className='btn btn-dark btn-sm'>
                            <IO5.IoEye size={16} />
                          </Link>
                          <Link to={routes.edit + blog.id} className='btn btn-success btn-sm'>
                            <BS.BsPencilFill size={16} />
                          </Link>
                          <button className='btn btn-sm btn-danger' onClick={() => delBlog(blog.id)}>
                            <IO5.IoTrash size={16} />
                          </button>
                        </div>
                        <div className="date">
                          <div className='d-flex align-items-center gap-1'>
                            <IO5.IoCalendar size={12} className='icon' />
                            <small>تاریخ:</small>
                            <small className='text-muted' title={ad_to_jalali(true, blog.created_at)}>{ad_to_jalali(blog.created_at)}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ))
            :
            <div className="loading d-flex flex-column w-100 gap-2 align-items-center py-4">
              <div className="spinner-grow text-primary" role="status">
              </div>
              <span>در حال دریافت اطلاعات، لطفا منتظر بمانید</span>
            </div>


        }


      </div>

    </div>
  )
}

export default MyBlog