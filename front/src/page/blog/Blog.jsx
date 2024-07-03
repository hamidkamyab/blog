﻿import axios from 'axios'
import Cookie from 'js-cookie'
import React, { useState } from 'react'
import * as IO5 from 'react-icons/io5'
function Blog() {
    const [previewImg, setPreviewImg] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handlePreviewImg = (e) => {
        setImage(e.target.files[0])
        const [file] = e.target.files
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title',title)
        formData.append('description',description)
        formData.append('image',image)
        formData.append('user_id',Cookie.get('user_id'))
        await axios.post('blog',formData)
        .then(res=>console.log(res))
    }

    return (
        <div id='blog' className='d-flex flex-row flex-wrap align-items-center justify-content-center container py-4 mt-3'>
            <div className="form-box no-w col-6 p-2 pb-4 bg-dark rounded-1 d-flex flex-column gap-2">

                <h5 className='title text-center py-3 border-bottom'>هرچی تو ذهنت هست بنویس</h5>

                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                    <div className="form-group">
                        <label className="form-label">عنوان مطلب</label>
                        <input type="text" name='title' className="form-control form-control-sm" onChange={(e)=>setTitle(e.target.value)} />
                        {/* <small className='form-msg'>{errors.title}</small> */}
                    </div>
                    <div className="form-group">
                        <label className="form-label">تصویر مطلب</label>
                        <input type="file" name='image' className="form-control form-control-sm" onChange={handlePreviewImg} />
                        {/* <small className='form-msg'>{errors.email}</small> */}
                    </div>
                    <div className="form-group">
                        <label className="form-label">متن</label>
                        <div className="d-flex">
                            <div className="text pe-1 col-6">
                                {/* <small className='form-msg'>{errors.password}</small> */}
                                <textarea name='description' className={`password form-control form-control-sm`} rows={8} onChange={(e)=>setDescription(e.target.value)} ></textarea>
                            </div>
                            <div className="pic px-1 col-6 d-flex justify-content-center align-items-center border border-1 border-secondary bg-light">
                                {
                                    previewImg ?
                                        <img src={previewImg} alt="" width={'100%'} />
                                        :
                                        <IO5.IoImage size={64} color='#bbb' />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="form-group pt-3">
                        <button className='btn btn-success btn-sm w-100'>ایجاد پست</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Blog
