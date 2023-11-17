import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react'

const ViewGarage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [cars, setCars] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

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

    const viewCar = (carId) => {
        console.log('tes')
        navigate(`/${garageId}/${carId}`);
    }

    //If cant get to work use ^
    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>
            {cars.length > 0 ? 
            <div className='container d-flex'>
                { cars.map((oneCar) => {
                return (
                    <div className="card" style={{width: '18rem'}} key={oneCar._id} onClick={() => viewCar(oneCar._id)}>
                        {/* card image eventually */}
                        <div className='card-body'>
                            <h5 className='card-title'>{oneCar.make}</h5>
                            <p className='card-text'>{oneCar.model} | {oneCar.year}</p>
                        </div>
                    </div>
                );
            })}
            </div>
            : <p>This garage is empty. Add some cars!</p> }
            <button className='btn btn-primary' onClick={addCar}>Add Car</button>
        </div>
    )
}

export default ViewGarage