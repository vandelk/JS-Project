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

    return (
        <div>
            <h1>My Garage</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;