import axios from 'axios';
import React, { useState } from 'react'
import * as IO5 from 'react-icons/io5'
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { ad_to_jalali } from '../../helper';
import Loading from '../../components/Loading';

function Search() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSearch, setIsSearch] = useState(false)


    const search = async (title) => {
        if(title.length > 4){
            setIsLoading(true)
            setIsSearch(false)
            await axios.get(`search/${title}`)
            .then((response) => {
                setIsLoading(false)
                setData(response.data)
                setIsSearch(true)
            })
            .catch(() => {
                setIsLoading(false)
                setIsSearch(true)
                setData([])
            })
        }else{
            setIsSearch(false)
        }
    }

    return (
        <div id="search" className='align-self-start pt-3'>
            <div className="page-header d-flex flex-column align-items-center gap-3 pt-2 mb-3">
                <h4 className='text-center'>جستجو سریع</h4>
                <div className='col-3'>
                    <input type="text" className='search-input form-control border border-1 shadow-none'
                        onChange={(e) => search(e.target.value)} placeholder='عنوان پست را جستجو کن...' />
                </div>
            </div>


            <div className="container d-flex flex-wrap">
                {
                    !isLoading ?
                        data.length > 0 ?
                            data.map((blog, index) => (
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
                                                        <small className='text-muted' title={ad_to_jalali(true, blog.created_at)}>{ad_to_jalali(blog.created_at)}</small>
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
                            isSearch&&
                            <h6 className='search-notFound'>نتیجه ای یافت نشد!</h6>
                            :
                            <Loading w={64} h={64} />

                }


            </div>

        </div>
    )
}

export default Search
