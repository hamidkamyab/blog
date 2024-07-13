import React from 'react'
import * as IO5 from 'react-icons/io5'
import * as BS from "react-icons/bs";
import { Link } from 'react-router-dom';
import routes from '../routes'
import { ad_to_jalali } from '../helper'

function BlogItem({ data, oprate = false, delEvent }) {

    const handleDel = (id)=>{
        delEvent(id)
    }

    return (
        <div className="blog-item col-4 p-3 d-flex">
            <div className="blog-box border border-1 d-flex flex-wrap align-items-start justify-content-center">
                <div className="top w-100">
                    <div className="imageBlog imgLoading">
                        <img src={`http://127.0.0.1:8000/uploads/blog/${data.image}`} alt="" />
                    </div>
                    <div className="contentBlog p-2">
                        {
                            data.title.length > 38 ?
                                <h6 className='blog-title'>{data.title.substring(0, 38) + '...'}</h6>
                                :
                                <h6 className='blog-title'>{data.title}</h6>
                        }
                        {
                            data.description.length > 92 ?
                                <p className='blog-description p-0 m-0'>{data.description.substring(0, 92) + '...'}</p>
                                :
                                <p className='blog-description p-0 m-0'>{data.description}</p>
                        }
                    </div>
                </div>

                {
                    oprate ?
                        <div className="bottom align-self-end p-2 w-100">
                            <hr className='my-1' />
                            <div className="details d-flex justify-content-between align-items-center my-1 mt-2">
                                <div className="oprate d-flex gap-2 align-items-center">
                                    <Link to={routes.singleBlog + data.id} className='btn btn-dark btn-sm'>
                                        <IO5.IoEye size={16} />
                                    </Link>
                                    <Link to={routes.edit + data.id} className='btn btn-success btn-sm'>
                                        <BS.BsPencilFill size={16} />
                                    </Link>
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDel(data.id)}>
                                        <IO5.IoTrash size={16} />
                                    </button>
                                </div>
                                <div className="date">
                                    <div className='d-flex align-items-center gap-1'>
                                        <IO5.IoCalendar size={12} className='icon' />
                                        <small>تاریخ:</small>
                                        <small className='text-muted' title={ad_to_jalali(true, data.created_at)}>{ad_to_jalali(data.created_at)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="bottom align-self-end p-2 w-100">
                            <hr className='my-1' />
                            <div className="details d-flex justify-content-between align-items-center mb-3">
                                <div className="author">
                                    <div className='d-flex align-items-center gap-1'>
                                        <IO5.IoPerson size={12} className='icon' />
                                        <small>نویسنده:</small>
                                        <small className='text-muted'>{data.user.name}</small>
                                    </div>
                                </div>
                                <div className="date">
                                    <div className='d-flex align-items-center gap-1'>
                                        <IO5.IoCalendar size={12} className='icon' />
                                        <small>تاریخ:</small>
                                        <small className='text-muted' title={ad_to_jalali(true, data.created_at)}>{ad_to_jalali(data.created_at)}</small>
                                    </div>
                                </div>
                            </div>
                            <Link to={routes.singleBlog + data.id} className='btn btn-dark btn-sm w-100'>
                                <IO5.IoEye />
                                <span className='mx-1'>مشــاهـده</span>
                            </Link>
                        </div>

                }



            </div>
        </div>
    )
}

export default BlogItem
