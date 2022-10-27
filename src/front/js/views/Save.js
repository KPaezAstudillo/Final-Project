import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/save.css'
import { Link } from 'react-router-dom';

const Save = () => {
    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className='alert '>
                <h2>Your data has been changed</h2>
                <Link to='/profile'>Back to my profile</Link>
            </div>


        </div>
    )
}
export default Save;