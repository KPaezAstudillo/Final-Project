import React, {useState} from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

export let navbar = {
    logo: 'Travellers Match',
    options: [
        { link: '/profile', label: 'Profile' },
        { link: '/users/:id/createtrip', label: 'Create Trip' },
        { link: '/mytrips', label: 'Trips' },
        { link: '/#', label: 'Contact' },
    ]
}
// cambiar logo a link
const Navbar2 = () => {
    const [login, setLogin] = useState(true)
    let navbar = {
        logo: 'Travellers Match',
        options: [
            { link: '/profile', label: 'Profile' },
            { link: '/users/:id/createtrip', label: 'Create Trip' },
            { link: '/mytrips', label: 'Trips' },
            { link: '/#', label: 'Contact' },
            { link: '/#', label: 'Services' },
        ]
    }



    return (<nav className="navbar navbar-expand-lg img-fluid sticky-top">
        <div className="container-fluid ">
        <img className="img-logo" src={logo} />
            <div className="item ps-0 d-flex align-items-center" to="#page-top" target="_blank"><strong>{navbar?.logo}</strong></div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="pe-3 collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto dropdown-menu-end">
                    {
                        navbar?.options.map(({ link, label }, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <Link className={index === 0 ? "nav-link active" : "nav-link"} to={link} aria-current={index === 0 ? "page" : null}>{label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </nav>
    )
};

Navbar2.propTypes = {
    navbar: PropTypes.object,
}

export default Navbar2;