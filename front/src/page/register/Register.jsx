import React from 'react'

function Register() {
  return (
    <div id='register' className='d-flex flex-row flex-wrap align-items-center justify-content-between container py-4 mt-3'>
        <div className="right px-2 col-6 d-flex justify-content-start">
          <div className="form-box p-2 pb-4 bg-dark rounded-1 d-flex flex-column gap-2">

              <h5 className='title text-center py-3 border-bottom'>همین حالا ثبت نام کنید</h5>

              <div className="form-group">
                <label for="exampleInputEmail1" class="form-label">نام شما</label>
                <input type="text" className="form-control form-control-sm" />
                <small className='form-msg'></small>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1" class="form-label">ایمیل شما</label>
                <input type="email" className="form-control form-control-sm" placeholder='example@yahoo.com' />
                <small className='form-msg'></small>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1" class="form-label">رمز عبور</label>
                <input type="text" className="form-control form-control-sm" />
                <small className='form-msg'></small>
              </div>
              <div className="form-group pt-3">
                <button className='btn btn-success btn-sm w-100'>ثبت نام</button>
              </div>
          </div>
        </div>
        <div className="left px-2 col-6 d-flex justify-content-end">
          <img src="./img/register.svg" alt="" className="svg-page" />
        </div>
    </div>
  )
}

export default Register