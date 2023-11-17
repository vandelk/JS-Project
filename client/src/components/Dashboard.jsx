import ViewMyGarages from './ViewMyGarages';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
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

    const createGarage = () => {
        navigate('/new-garage');
    }

    return (
        <div>
            <div className='my-nav navbar d-flex p-2 mb-4'>
                <h1 className='text-center'>MyGarages</h1>
                <button className='btn float-end' onClick={logout}>Logout</button>
            </div>
            {
                loggedIn ? (
                    <ViewMyGarages user_id={loggedIn._id}/>
                ): <h3>Loading...</h3>
                
            }
            <div>
                <button className='btn btn-primary garage-btn' onClick={() => createGarage()}>New Garage</button>
            </div>
        </div>
    )
}

export default Dashboard;