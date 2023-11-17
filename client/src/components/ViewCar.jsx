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

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            {car ? 
            <div>
                <h1>Make: {car.car.make}</h1>
                <h2>Model: {car.car.model}</h2>
                <h2>Year Made: {car.car.year}</h2>
                <button onClick={goBack}>Back</button>
            </div>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}

export default ViewCar