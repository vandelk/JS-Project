import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ViewCar = (props) => {
    const [car, setCar] = useState(null);
    const { garageId, carId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/car/${carId}`)
            .then(res => {
                setCar(res.data);
            })
            .catch(err => {
                console.log(err)
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

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            {car ? 
            <div className='modal fade' id="exampleModal">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5' id='exampleModalLabel'><h1>Make: {car.car.make}</h1></h1>
                        </div>
                        <div className='modal-body'>
                            <h1>Make: {car.car.make}</h1>
                            <h2>Model: {car.car.model}</h2>
                            <h2>Year Made: {car.car.year}</h2>
                        </div>
                    </div>

                </div>
                <button onClick={goBack}>Back</button>
            </div>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}

export default ViewCar