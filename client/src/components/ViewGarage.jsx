import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react'

const ViewGarage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [cars, setCars] = useState([]);
    const [garageName, setGarageName] = useState("");
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

    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/login');
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/garage/${garageId}`)
    //         .then(res => {
    //             setCars(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

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
        //navigate(`/${garageId}/${carId}`);
    }

    //If cant get to work use ^
    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>
            <div className='my-nav navbar d-flex p-2 mb-4'>
                <h1 className='text-center' onClick={() => navigate('/dashboard')}>MyGarages</h1>
                <button className='btn float-end' onClick={logout}>Logout</button>
            </div>
            {/* <h3>{garageName}</h3> */}
            {cars.length > 0 ? 
            <div className='container d-flex'>
                { cars.map((oneCar) => {
                return (
                    <>
                        <div className="card border-light mx-3" style={{width: '18rem'}} key={oneCar._id} >
                            {/* <button data-bs-toggle="modal" data-bs-target="#exampleModal">Testing</button> */}
                            {/* card image eventually */}
                            <div className='card-body'>
                                <h5 className='card-title'>{oneCar.make}</h5>
                                <p className='card-text'>{oneCar.model} | {oneCar.year}</p>
                            </div>
                        </div>
                    </>
                );
            })}
                <div className='modal fade' id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h1 className='modal-title fs-5' id='exampleModalLabel'>Make: </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className='modal-body'>
                                <h1>Make: </h1>
                                <h2>Model: </h2>
                                <h2>Year Made: </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <p>This garage is empty. Add some cars!</p> }
            <button className='btn btn-primary garage-btn' onClick={addCar}>Add Car</button>
        </div>
    )
}

export default ViewGarage