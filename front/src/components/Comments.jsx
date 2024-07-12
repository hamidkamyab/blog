import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loading from './Loading';
import CommentItem from './CommentItem';

function Comments() {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState({})

    const { id } = useParams()

    const sendComment = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('user_id', Cookie.get('user_id'))
        formData.append('blog_id', id)
        formData.append('description', comment)
        await axios.post('/comment', formData)
            .then(response => {
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'تبریک میگم',
                        text: response.data.message,
                        confirmButtonText: 'بستن'
                    })
                    setLoading(false)
                    setComment('')
                    getComments()
                } else {
                    setErrors(response.data.errors);
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'عملیات با خطا مواجه شد',
                    text: 'ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.',
                    confirmButtonText: 'متوجه شدم',
                    confirmButtonColor: '#8c7ae6',
                })
            })
    }

    const getComments = async () => {
        await axios.get(`/comment-view/${id}`)
            .then(response => {
                setComments(response.data.reverse())
                setCommentsLoading(false)
            })
    }

    useEffect(() => {
        return () => {
            setToken(Cookie.get('token'))
            getComments()
        };
    }, []);
    return (
        <>
            {
                token &&
                <div className="send-comment py-2">
                    <form action="" onSubmit={sendComment}>
                        <div className="col-12 form-group">
                            <label htmlFor="descriptionInput" className='form-label col-form-label-sm text-muted'>متن دیدگاه</label>
                            <textarea name="description" className='form-control' id="descriptionInput" rows="10" placeholder='دیدگاه خود را راجب این پست بنویسید....' onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                            <small className='text-danger'>{errors.description}</small>
                        </div>
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button className='btn btn-success btn-sm d-flex align-items-center justify-content-center gap-2'
                                disabled={loading} type='submit' >
                                {
                                    !loading ?
                                        <span>ثبت دیدگاه</span>
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
            }
            <div className="comments-list">
                {
                    !commentsLoading ?
                        comments.length > 0 ?
                            <CommentItem comments={comments} />
                            :
                            <h6 className='w-100 text-center my-1 p-0 text-muted'>دیدگاهی برای این بلاگ ثبت نشده است</h6>

                        :
                        <Loading />
                }
            </div>
        </>
    )
}

export default Comments
