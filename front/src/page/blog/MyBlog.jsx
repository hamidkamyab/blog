import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as IO5 from 'react-icons/io5'
import * as FI from "react-icons/fi";
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import BlogItem from '../../components/BlogItem';

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

  useEffect(() => {
    return () => {
      getBlogs()
    };
  }, []);


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
              getBlogs()
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


  return (
    <div id="myBlog" className='align-self-start pt-3'>
      <div className="page-header  d-flex flex-column align-items-center gap-3 pt-2">
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
                <BlogItem data={blog} key={index} delEvent={delBlog} oprate={true} />

              ))
            :
            <Loading w={64} h={64} />


        }


      </div>

    </div>
  )
}

export default MyBlog