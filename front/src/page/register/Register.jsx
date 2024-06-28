import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    const [passPlaceholder, setpassPlaceholder] = useState("حداقل 8 کاراکتر(حروف،عدد و کاراکتر خاص)");
    const [passwordClass, setPasswordClass] = useState('');
    const handleBlurPassword = (e) => {
        e.target.value?
            setPasswordClass('pass-ltr')
        :
            setPasswordClass('')
            setpassPlaceholder('حداقل 8 کاراکتر(حروف،عدد و کاراکتر خاص)')
        ;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post('http://127.0.0.1:8000/api/register', {
            name,
            email,
            password
        },{
            headers:{
                "Content-Type":'Application/json',
                "Accept":'Application/json'
            }
        })
            .then(function (response) {
                if(response.data.status == 200){
                    Swal.fire({
                        icon:'success',
                        title:'عملیات موفقیت آمیز بود',
                        text:`${response.data.name} عزیز ثبت نام شما با موفقیت انجام شد`,
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
        <div id='register' className='d-flex flex-row flex-wrap align-items-center justify-content-between container py-4 mt-3'>
            <div className="right px-2 col-6 d-flex justify-content-start">
                <div className="form-box p-2 pb-4 bg-dark rounded-1 d-flex flex-column gap-2">

                    <h5 className='title text-center py-3 border-bottom'>همین حالا ثبت نام کنید</h5>

                    <form onSubmit={handleSubmit} className=' d-flex flex-column gap-2'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label">نام شما</label>
                            <input type="text" name='name' className="form-control form-control-sm" onChange={(e) => setName(e.target.value)} />
                            <small className='form-msg'>{errors.name}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label">ایمیل شما</label>
                            <input type="email" name='email' className="form-control form-control-sm" placeholder='example@yahoo.com'
                                onChange={(e) => setEmail(e.target.value)} />
                            <small className='form-msg'>{errors.email}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="form-label">رمز عبور</label>
                            <input type="password" name='password' className={`password form-control form-control-sm ${passwordClass}`} placeholder={passPlaceholder} onFocus={() => setpassPlaceholder('')} onBlur={handleBlurPassword} onChange={(e) => setPassword(e.target.value)} />
                            <small className='form-msg'>{errors.password}</small>
                        </div>
                        <div className="form-group pt-3">
                            <button className='btn btn-success btn-sm w-100'>ثبت نام</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="left px-2 col-6 d-flex justify-content-end">
                <img src="./img/register.svg" alt="" className="svg-page" />
            </div>
        </div>
    )
}

export default Register