import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const ViewMyGarages = (props) => {
    const [garages, setGarages] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/garages/${props.user_id}`)
            .then(res => {
                setGarages(res.data)
            })
            .catch(err => console.log(err))
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
        <div className='container'>
            { garages.length > 0 ?
            <div className='d-flex justify-content-center'>
                { garages.map((oneGarage) => {
                    return (
                        <div className="card border-light mb-3 mx-3 p-4 " style={{width: '18rem'}}  key={oneGarage._id} onClick={() => navigate("/garage/" + oneGarage._id)}>
                            <h3>{oneGarage.name}</h3>
                        </div>
                    );
                })}
            </div>
            : <h3>You have no Garages. Create a Garage now!</h3> }
        </div>
    )
}

export default ViewMyGarages