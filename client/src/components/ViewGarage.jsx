import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ViewGarage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [cars, setCars] = useState([]);
    const { garageId } = useParams();
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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cars/${garageId}`)
            .then(res => {
                setCars(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const addCar = () => {
        navigate(`/${garageId}/new-car`);
    }

    return (
        <div>
            {cars.length > 0 ? 
            <div>
                { cars.map((oneCar) => {
                return (
                    <div key={oneCar._id}>
                        <div>{oneCar.make}</div>
                    </div>
                );
            })}
            </div>
            : <p>This garage is empty. Add some cars!</p> }
            <button onClick={addCar}>Add Car</button>
        </div>
    )
}

export default ViewGarage