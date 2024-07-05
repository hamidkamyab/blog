import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import * as IO5 from 'react-icons/io5'
import * as FI from "react-icons/fi";
import { Link } from 'react-router-dom';
import routes from '../../routes';
import moment from "moment-jalaali";

function Home() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const getBlogs = async () => {
    setIsLoading(true)
    await axios.get('view-blog')
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

  const convertDate = (hour, mDate) => {
    if (hour) {
      return moment(mDate, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss jYYYY/jMM/jDD')
    } else {
      return moment(mDate, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jMM/jDD')
    }

  }

  useEffect(() => {
    return () => {
      getBlogs()
    };
  }, []);

  return (
    <div id="home" className='align-self-start'>
      <div className="home-header d-flex flex-column align-items-center gap-3">
        <img src="./img/home.svg" alt="" />
        <h4 className='text-center'>از همه جا با ما باش</h4>
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
                      <div className="details d-flex justify-content-between align-items-center mb-3">
                        <div className="author">
                          <div className='d-flex align-items-center gap-1'>
                            <IO5.IoPerson size={12} className='icon' />
                            <small>نویسنده:</small>
                            <small className='text-muted'>{blog.user.name}</small>
                          </div>
                        </div>
                        <div className="date">
                          <div className='d-flex align-items-center gap-1'>
                            <IO5.IoCalendar size={12} className='icon' />
                            <small>تاریخ:</small>
                            <small className='text-muted' title={convertDate(true, blog.created_at)}>{convertDate(false, blog.created_at)}</small>
                          </div>
                        </div>
                      </div>
                      <Link to={routes.singleBlog + blog.id} className='btn btn-dark btn-sm w-100'>
                        <IO5.IoEye />
                        <span className='mx-1'>مشــاهـده</span>
                      </Link>
                    </div>
                  </div>
                </div>

              ))
            :
            <div className="loading d-flex flex-column w-100 gap-2 align-items-center py-4">
              <div class="spinner-grow text-primary" role="status">
              </div>
              <span>در حال دریافت اطلاعات</span>
            </div>


        }


      </div>

    </div>
  )
}

export default Home