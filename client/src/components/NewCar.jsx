import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const NewCar = (props) => {
    const [car, setCar] = useState({
        make: "",
        model: "",
        year: 0
    });
    const { garageId } = useParams();
    const navigate = useNavigate();

    const changeHandler = e => {
        setCar({
            ...car,
            [e.target.name]: e.target.value
        })
    }

    const addCar = e => {
        e.preventDefault();
    
        axios.get(`http://localhost:8000/api/garage/${garageId}`)
            .then(res => {
                //console.log(res.data.garage._id)
                const newCar = {
                    ...car,
                    garage_id: res.data.garage._id
                }
                console.log(newCar)
                return axios.post(`http://localhost:8000/api/car/${res.data.garage._id}`, newCar)
                .then(res => {
                    console.log(res);
                    navigate(`/garage/${garageId}`);
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Add a Car</h1>
            <form onSubmit={addCar}>
                <div>
                    <label>Manufacturer</label>
                    <select name="make" id="make" onChange={changeHandler}>
                        <option value="Audi">Audi</option>
                        <option value="Bentley">Bentley</option>
                        <option value="BMW">BMW</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Citroen">Citroen</option>
                        <option value="Dodge">Dodge</option>
                        <option value="Ferrari">Audi</option>
                        <option value="Ford">Ford</option>
                        <option value="Honda">Honda</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Jaguar">Jaguar</option>
                        <option value="Jeep">Jeep</option>
                        <option value="Kia">Kia</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Land Rover">Land Rover</option>
                        <option value="Lexus">Lexus</option>
                        <option value="Maserati">Maserati</option>
                        <option value="Mazda">Mazda</option>
                        <option value="McLaren">McLaren</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Mini">Mini</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Porshe">Porshe</option>
                        <option value="Subaru">Subaru</option>
                        <option value="Tesla">Tesla</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Volvo">Volvo</option>
                    </select>
                </div>
                <div>
                    <label>Model</label>
                    <input type="text" name="model" id="model" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Year</label>
                    <input type="number" name="year" id="year" onChange={changeHandler}/>
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}

export default NewCar