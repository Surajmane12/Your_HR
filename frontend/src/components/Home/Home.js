import React from 'react'
import './home.css'
import right_img from './Images/right_sec.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
const Home = () => {


    const navigate=useNavigate();

    useGSAP(()=>{
        gsap.from(".left_section h1",{
            opacity:0,
            y:-20,
            duration:2,
            delay:1,
            stagger:1

        })
        gsap.from(".left_section p",{
            opacity:0,
            y:-10,
            duration:3,
            delay:2,
            stagger:1

        })

        gsap.from(".right_section img",{
            opacity:0,
            y:-20,
            duration:2
        })

        gsap.from('.see_job_btn',{
            opacity:0,
            y:-40,
            duration:2
        })
    })

    const handlesubmitform=()=>{
   navigate('/signup')
    }
    return (
        <>

             <div className="outer_home_section">
              

                {/* Home Section */}

                <div className="home_section">

                    <div className="left_section">

                        <h1>Welcome to YourHR Portal!!!</h1>
                        <p>Empowering careers through seamless job matching – our portal connects talent with opportunities, simplifying the journey from application to employment.</p>
                        <div className='see_job_btn'>
                            <button className='btn btn-primary' onClick={handlesubmitform}>Apply <FontAwesomeIcon icon={faArrowRight}/>
                            </button>
                        </div>
                    </div>

                    <div className="right_section">
                        <img src={right_img}/>

                    </div>


                </div>
            

                </div>
        </>
    )
}

export default Home
