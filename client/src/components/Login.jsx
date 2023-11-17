import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const changeHandler = e => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', userLogin, {withCredentials: true})
      .then( res => {
        console.log(res)
        if(res.data.msg === 'success') {
          navigate('/dashboard');
        }
        else {
          //set error messages
          setErrors(res.data.msg);
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div >
      <div className='my-nav navbar p-2 mb-4'>
                <h1>MyGarages</h1>
            </div>
      <h3>Login</h3>
      <form onSubmit={login}>
        <div className='d-flex justify-content-center mb-3'>
          <input type="text" className="form-control" style={{width: '18rem'}} name="email" id="email" placeholder='Email' onChange={changeHandler} />
        </div>
        <div className='d-flex justify-content-center mb-3'>
          <input type="password" className="form-control" style={{width: '18rem'}} name="password" id="password" placeholder='Password' onChange={changeHandler} />
        </div>
        <button className='btn btn-primary mb-2' >Login</button>
        {errors ? <p>{errors}</p> : ""}
      </form>
      <Link to='/'>Need to create an account? Register here</Link>
    </div>
  )
}

export default Login;