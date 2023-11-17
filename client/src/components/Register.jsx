import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [userReg, setUserReg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({

    });

    const navigate = useNavigate();

    const changeHandler = e => {
        setUserReg({
            ...userReg,
            [e.target.name]: e.target.value
        })
    }

    const register = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", userReg, {withCredentials:true})
            .then(res => {
                console.log(res);
                if(res.data.errors) {
                    setErrors(res.data.errors)
                }
                else {
                    navigate('/dashboard');
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='my-nav navbar p-2 mb-4'>
                <h1>MyGarages</h1>
            </div>
            <h3>Register</h3>
            <div className='container'>
                <form className='col-sm' onSubmit={register}>
                    <div className='d-flex justify-content-center mb-3'>
                        <input type="text" className="form-control" style={{width: '18rem'}} name="firstName" id="firstName" placeholder='First Name' onChange={changeHandler} />
                        {errors.firstName ? <p>{errors.firstName.message}</p> : ""}
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <input type="text" className="form-control" style={{width: '18rem'}} name="lastName" id="lastName" placeholder='Last Name' onChange={changeHandler}/>
                        {errors.lastName ? <p>{errors.lastName.message}</p> : ""}
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <input type="text" className="form-control" style={{width: '18rem'}} name="email" id="email" placeholder='Email' onChange={changeHandler}/>
                        {errors.email ? <p>{errors.email.message}</p> : ""}
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <input type="password" className="form-control" style={{width: '18rem'}} name="password" id="password" placeholder='Password' onChange={changeHandler}/>
                        {errors.password ? <p>{errors.password.message}</p> : ""}
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <input type="password" className="form-control" style={{width: '18rem'}} name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' onChange={changeHandler}/>
                        {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : ""}
                    </div>
                    <button className='btn btn-primary mb-2 float-right'>Sign Up</button>
                </form>
            </div>
            <Link to='/login'>Have an account? Login here</Link>
        </div>
    )
}

export default Register