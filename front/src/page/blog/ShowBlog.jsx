import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as IO5 from 'react-icons/io5'
import * as FI from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { ad_to_jalali } from '../../helper';
import Comments from '../../components/Comments';
import Loading from '../../components/Loading';

function SingleBlog() {
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState(null)

  const { id } = useParams();
  const getBlog = async () => {
    await axios.get(`detail-blog/${id}`)
      .then(response => {
        setBlog(response.data.blog);
        setError(false)
        setTimeout(() => {
          setIsLoadingBlog(false)
        }, 2000);
      })
      .catch(() => {
        setIsLoadingBlog(false)
        setError(true)
      })
  }

  useEffect(() => {
    return () => {
      getBlog()
    };
  }, []);
  return (
    <div id='single-blog' className='container py-4 d-flex justify-content-center'>
      {
        !isLoadingBlog ?
          error ?
            <div className="error d-flex flex-column align-items-center justify-content-start gap-2 py-4 col-12">
              <h6 className='text-decoration-underline text-muted'>
                <FI.FiAlertTriangle size={18} className='me-2' />
                ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.
              </h6>
              <button className='btn btn-outline-dark btn-sm' onClick={getBlog}>
                <IO5.IoReload size={16} />
                <span className='ms-1'>تلاش مجدد</span>
              </button>
            </div>
            :
            <div className="blogBox my-2 border border-1 d-flex flex-wrap justify-content-center col-8">
              <div className="top w-100">
                <div className="imageBlog imgLoading">
                  <img src={`http://127.0.0.1:8000/uploads/blog/${blog.image}`} alt="" />
                </div>
              </div>
              <div className="bottom w-100 py-2 px-3">
                <div className="details d-flex align-items-center justify-content-between border-bottom border-2 pb-1 my-3">
                  <div className="author">
                    <IO5.IoPerson size={14} />
                    <small className='ms-1'>نویسنده:</small>
                    <small className='ms-2'>{blog.user.name}</small>
                  </div>
                  <div className="date">
                    <small className='me-1'>{ad_to_jalali(blog.created_at, true)}</small>
                    <IO5.IoCalendar size={14} className='mb-1' />
                  </div>
                </div>
                <div className="title py-2">
                  <h5>{blog.title}</h5>
                </div>
                <div className="description pb-4">
                  <p className='p-0 m-0'>{blog.description}</p>
                </div>
              </div>
              <div className="comments w-100 p-3">
                <Comments />
              </div>
            </div>
          :
          <Loading w={64} h={64} />
      }

    </div>
  )
}

export default SingleBlog

