import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewGarage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [garageName, setGarageName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/loggedIn', {withCredentials: true})
        .then(res => {
            console.log(res)
            setLoggedIn(res.data.user)
        })
        .catch(err => {
            console.log(err)
            navigate('/login');
        })
    }, [])

    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/login');
            })
            .catch(err => console.log(err))
    }

    const changeHandler = e => {
        setGarageName(e.target.value);
    }

    const createGarage = e => {
        e.preventDefault();
        const newGarage = {
            name: garageName,
            user_id: loggedIn._id
        }
        axios.post(`http://localhost:8000/api/garage/${loggedIn._id}`, newGarage)
            .then(res => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='my-nav navbar d-flex p-2 mb-4'>
                <h1 className='text-center' onClick={() => navigate('/dashboard')}>MyGarages</h1>
                <button className='btn float-end' onClick={logout}>Logout</button>
            </div>
            <h3>New Garage</h3>
            <form onSubmit={createGarage}>
                <div className='d-flex justify-content-center mb-3'>
                    <input type="text" className="form-control" style={{width: '18rem'}} name="name" id="name" placeholder='Name' onChange={changeHandler}/>
                    {/* {errors.firstName ? <p>{errors.firstName.message}</p> : ""} */}
                </div>
                <button className='btn btn-primary'>Create</button>
            </form>
        </div>
    )
}

export default NewGarage