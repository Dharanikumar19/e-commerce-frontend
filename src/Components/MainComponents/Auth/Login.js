import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    email: "", password: ""
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  
  const loginSubmit = async (e) =>{
    e.preventDefault()
    try {
       const result =  await axios.post('https://dk-e-commerce.netlify.app/user/login', {...user})
        localStorage.setItem('firstLogin', result.data.accesstoken)      
          window.location.href = "/";
    } catch (error) {
        alert(error.response.data.msg)
    }
}

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-6">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: '185px' }} alt="logo" />

                  </div>

                  <form onSubmit={loginSubmit}>
                    <p className='text-center text-bold mb-4' style={{ fontSize: "20px" }}> Login to your account</p>

                    <div className="form-outline mb-4">
                      <input type="email" className="form-control" name="email" placeholder="Enter your email address"
                        value={user.email} onChange={onChangeInput} required />
                      <label className="form-label">Email Id</label>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="pwd">
                        <input type={passwordShown ? "text" : "password"} name='password' placeholder='Enter your password' className="form-control"
                          value={user.password} onChange={onChangeInput} required autoComplete="on" />
                        <span className="p-viewer">
                          <i onClick={togglePassword} className="fa fa-eye" aria-hidden="true"></i>
                        </span>
                      </div>
                      <label className="form-label">Password</label>
                    </div>

                    <div className="text-center pt-1 mb-4 pb-1">
                      <button className="btn btn-primary btn-block" type="submit">Log in</button>
                    </div>

                    </form>
                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <Link to={"/register"}><u>Register here</u></Link>

                    </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;
