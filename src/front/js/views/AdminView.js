import React, { useEffect, useState, useHistory } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash} from "react-icons/fa";

import '../../styles/adminview.css';

const AdminView = () => {
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        fetchAllUsers()
    }, [allUsers])

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/users`);
            const data = await response.json()
            setAllUsers(data)


        } catch (error) {
            console.log(error)
        }
    }

const deleteUser = async (id) => {
    try {
        //console.log("attempt to fetch")
    
        const response = await fetch(`${process.env.BACKEND_URL}/user/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },

        });
        const data = await response.json()
        
        console.log(data);

    } catch (error) {
        console.log(error)
    }

}

    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteUser(id);
        
    }

    return (
        <div className='container d-flex flex-column'>
            <h1 className='mx-auto'> Travellers Match Users</h1>
            <ul className="list-group mx-auto">

            {allUsers?.map((user, index) => {
                return <li class="list-group-item ms-3" key={index} >{user.firstname} {user.lastname} <button className='btn btn-danger' onClick={(e) =>handleDelete(e, user.id)}> <FaTrash /> </button> </li>
            })}
            </ul>
        </div>
    )
}
export default AdminView;