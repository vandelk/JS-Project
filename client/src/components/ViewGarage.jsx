import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewGarage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/loggedIn', { withCredentials: true })
            .then(res => {
                console.log(res)
                setLoggedIn(res.data.user)
            })
            .catch(err => {
                console.log(err)
                navigate('/login');
            })
    }, [])

    return (
        <div>
            <h1>Section to come...</h1>
            {/* <button>Add Car</button> */}
        </div>
    )
}

export default ViewGarage