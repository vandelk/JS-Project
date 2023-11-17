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
            <h1>New Garage</h1>
            <form onSubmit={createGarage}>
                <div>
                    <label>Garage Name</label>
                    <input type="text" name="name" id="name" onChange={changeHandler}/>
                    {/* {errors.firstName ? <p>{errors.firstName.message}</p> : ""} */}
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default NewGarage