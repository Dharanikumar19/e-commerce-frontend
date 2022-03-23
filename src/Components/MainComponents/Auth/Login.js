import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./Login.css";


function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    email: "", password: ""
  })
  const navigate = useNavigate()

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
      await axios.post("https://dk-e-commerce.herokuapp.com/user/login", {...user})
      localStorage.setItem("firstLogin", true)
        navigate("/")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
      <section class="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-6">
              <div class="card rounded-3 text-black">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: '185px' }} alt="logo" />

                  </div>

                  <form onSubmit={loginSubmit}>
                    <p className='text-center text-bold' style={{ fontSize: "20px", fontFamily:"600" }}> Login to your account</p>
                    <div class="form-outline mb-4">
                      <input type="email" class="form-control" name="email" placeholder="Enter your email address"
                        value={user.email} onChange={onChangeInput} required />
                      <label class="form-label" >Email Id</label>
                    </div>

                    <div class="form-outline mb-4">
                      <div class="pwd">
                        <input type={passwordShown ? "text" : "password"} name='password' placeholder='Enter your password' className="form-control"
                          value={user.password} onChange={onChangeInput} required />
                        <span class="p-viewer">
                          <i onClick={togglePassword} class="fa fa-eye" aria-hidden="true"></i>
                        </span>
                      </div>
                      <label class="form-label">Password</label>
                    </div>

                    <div class="text-center pt-1 mb-4 pb-1">
                      <button class="btn btn-primary btn-block" type="submit">Log in</button>
                    </div>

                    </form>
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Don't have an account?</p>
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
