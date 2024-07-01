import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import routes from '../../routes';
import Cookie from 'js-cookie';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')    

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post('login', {
            email,
            password
        })
            .then(function (response) {
                if(response.data.status == 200){
                 
                  Cookie.set('name', response.data.name, { expires: 1 })
                  Cookie.set('id', response.data.user_id, { expires: 1 })
                  Cookie.set('token', response.data.token, { expires: 1 })

                  window.dispatchEvent(new Event('storage'));

                  navigate(routes.home)
                }else if(response.data.status == 401){
                  Swal.fire({
                    icon:'warning',
                    title:response.data.message,
                    confirmButtonText:'متوجه شدم'
                })
                }else{
                    setErrors(response.data.validation_errors)
                }
            })
            .catch(function() {
                Swal.fire({
                    icon:'error',
                    title:'عملیات با خطا مواجه شد',
                    text:'ارتباط با سرور با خطا مواجه شده، لطفا مجددا تلاش کنید.',
                    confirmButtonText:'متوجه شدم'

                })
            });
    }


    return (
        <div id='login' className='d-flex flex-row flex-wrap align-items-center justify-content-between container py-4 mt-3'>
            <div className="right px-2 col-6 d-flex justify-content-start">
                <div className="form-box p-2 pb-4 bg-dark rounded-1 d-flex flex-column gap-2">

                    <h5 className='title text-center py-3 border-bottom'>همین حالا وارد حسابتان شوید</h5>

                    <form onSubmit={handleSubmit} className=' d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label">ایمیل شما</label>
                            <input type="email" name='email' className="form-control form-control-sm" placeholder='example@yahoo.com'
                                onChange={(e) => setEmail(e.target.value)} />
                            <small className='form-msg'>{errors.email}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label">رمز عبور</label>
                            <input type="password" name='password' className='password form-control form-control-sm'
                              onChange={(e) => setPassword(e.target.value)} />
                            <small className='form-msg'>{errors.password}</small>
                        </div>
                        <div className="form-group pt-3">
                            <button className='btn btn-success btn-sm w-100'>ورود به حساب کاربری</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="left px-2 col-6 d-flex justify-content-end">
                <img src="./img/login.svg" alt="" className="svg-page" />
            </div>
        </div>
    )
}

export default Login