import axios from 'axios'
import Cookie from 'js-cookie'
import React, { useState } from 'react'
import * as IO5 from 'react-icons/io5'
import Swal from 'sweetalert2'
function Blog() {
    const [loading, setLoading] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState({})

    const handlePreviewImg = (e) => {
        setImage(e.target.files[0])
        const [file] = e.target.files
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('user_id', Cookie.get('user_id'))

        await axios.post('blog', formData)
            .then((response) => {
                setLoading(false)
                if (response.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        confirmButtonText: 'متوجه شدم'
                    })
                    document.querySelectorAll('.form-control').forEach((item) => {
                        item.value = ''
                    })
                    setPreviewImg(null)
                } else {
                    setErrors(response.data.errors)
                }
            })
            .catch(() => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'عملیات با خطا مواجه شد',
                    text: 'ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.',
                    confirmButtonText: 'متوجه شدم'

                })
            })
    }

    return (
        <div id='blog' className='d-flex flex-row flex-wrap align-items-center justify-content-center container py-4 mt-3'>
            <div className="form-box no-w col-6 p-2 pb-4 bg-dark rounded-1 d-flex flex-column gap-2">

                <h5 className='title text-center py-3 border-bottom'>هرچی تو ذهنت هست بنویس</h5>

                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                    <div className="form-group">
                        <label className="form-label">عنوان مطلب</label>
                        <input type="text" name='title' className="form-control form-control-sm" 
                        disabled={loading}
                        onChange={(e) => setTitle(e.target.value)} />
                        <small className='form-msg'>{errors.title}</small>
                    </div>
                    <div className="form-group">
                        <label className="form-label">تصویر مطلب</label>
                        <input type="file" name='image' className="form-control form-control-sm"
                        disabled={loading}
                        onChange={handlePreviewImg} />
                        <small className='form-msg'>{errors.image}</small>
                    </div>
                    <div className="form-group">
                        <label className="form-label">متن</label>
                        <small className='form-msg ms-2'>{errors.description}</small>
                        <div className="d-flex">
                            <div className="text pe-1 col-6">
                                <textarea name='description' className="form-control form-control-sm" rows={8} 
                                disabled={loading}
                                onChange={(e) => setDescription(e.target.value)} ></textarea>
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
                        <button className='btn btn-success btn-sm w-100 d-flex align-items-center justify-content-center gap-2' disabled={loading}>
                            {
                                !loading ?
                                    <span>ایجاد پست</span>
                                    :
                                    <>
                                        <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                        <span role="status">لطفا صبر کنید...</span>
                                    </>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Blog
