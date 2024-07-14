import axios from 'axios';
import React, { useEffect, useState } from 'react'
import * as IO5 from 'react-icons/io5'
import * as FI from "react-icons/fi";
import homeSVG from '../../assets/img/home.svg'
import BlogItem from '../../components/BlogItem';
import Skeleton from '../../components/Skeleton';

function Home() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [total, setTotal] = useState(0)
  console.log(blogs)
  const getBlogs = async () => {
    setIsLoading(true)
    let page = currentPage + 1;
    await axios.get(`view-blog?page=${page}`)
      .then((response) => {
        setIsLoading(false)
        setError(false)
        if (response.data.status == 200) {
          setBlogs([...blogs, ...response.data.blog.data])
          setCurrentPage(response.data.blog.current_page)
          setLastPage(response.data.blog.last_page)
          setTotal(response.data.blog.total)
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

  return (
    <div id="home" className='align-self-start'>
      <div className="page-header d-flex flex-column align-items-center gap-3">
        <img src={homeSVG} alt="" />
        <h4 className='text-center'>از همه جا با ما باش</h4>
      </div>

      <div className="container d-flex flex-wrap">



        {
          blogs.length > 0 ?
            blogs.map((blog, index) => (
              <BlogItem data={blog} key={index} />
            ))
            :
            <></>
        }
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
            <></>
          :
            <Skeleton h={376} num={3} customClass={'col-4 p-3'} />
        }

        <div className="p-3 w-100">
        <button className="btn btn-dark w-100 py-2" onClick={getBlogs} disabled={currentPage == lastPage || isLoading?true:false}>
          نمایش بیشتر
        </button>
        </div>
      </div>

    </div>
  )
}

export default Home