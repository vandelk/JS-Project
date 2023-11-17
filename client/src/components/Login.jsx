import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input type="text" name="email" id="email" onChange={changeHandler} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" id="password" onChange={changeHandler} />
        </div>
        <button>Login</button>
        {errors ? <p>{errors}</p> : ""}
      </form>
    </div>
  )
}

export default Login;