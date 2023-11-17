import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            <h1>Register</h1>
            <form onSubmit={register}>
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" id="firstName" onChange={changeHandler} />
                    {errors.firstName ? <p>{errors.firstName.message}</p> : ""}
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" id="lastName" onChange={changeHandler}/>
                    {errors.lastName ? <p>{errors.lastName.message}</p> : ""}
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" id="email" onChange={changeHandler}/>
                    {errors.email ? <p>{errors.email.message}</p> : ""}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" id="password" onChange={changeHandler}/>
                    {errors.password ? <p>{errors.password.message}</p> : ""}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" onChange={changeHandler}/>
                    {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : ""}
                </div>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default Register