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
            <div>
                <h1>My Garages</h1>
                <button onClick={logout}>Logout</button>
            </div>
            {
                loggedIn ? (
                    <ViewMyGarages user_id={loggedIn._id}/>
                ): <h3>Loading...</h3>
                
            }
            <div>
                <button onClick={() => createGarage()}>New Garage</button>
            </div>
        </div>
    )
}

export default Dashboard;