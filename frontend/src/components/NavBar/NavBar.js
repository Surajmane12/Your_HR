import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {


    const navigate=useNavigate();
    const handlenavigate=()=>{
        navigate('/signup')
    }
    return (
        <div className='outer_home_section'>

            <div class="navbar">
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div class="col-md-3 py-3 mb-2 mb-md-0">
                        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                            {/* <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                        </a>
                    </div>

                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" class="nav-link px-2 link-secondary">Home</Link></li>
                        <li><a href="#" class="nav-link px-2">Features</a></li>
                        <li><a href="#" class="nav-link px-2">Pricing</a></li>
                        <li><a href="#" class="nav-link px-2">FAQs</a></li>
                        <li><a href="#" class="nav-link px-2">About</a></li>
                    </ul>

                    <div class="col-md-3 text-end">
                        <button type="button" class="btn btn-outline-primary me-2">Login</button>
                        
                        <button type="button" class="btn btn-primary" onClick={handlenavigate}>
                          
                            Sign-up</button>
                        
                    </div>
                </header>
            </div>
        </div>
    )
}

export default NavBar
