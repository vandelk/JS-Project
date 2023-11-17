import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const ViewMyGarages = (props) => {
    const [garages, setGarages] = useState([]);
    //console.log(props.user_id)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/garage/${props.user_id}`)
            .then(res => {
                setGarages(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            { garages.map((oneGarage) => {
                return (
                    <div key={oneGarage._id}>
                        <Link to={"/garage/" + oneGarage.name}>{oneGarage.name}</Link>
                    </div>
                );
            })}
        </div>
    )
}

export default ViewMyGarages