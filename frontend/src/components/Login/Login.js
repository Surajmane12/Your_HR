import React from 'react'
import './login.css'
import login from './Images/login_svg.jpg';
const Login = () => {
  return (


    <div className='outer_container'>
    <div className="login_svg">
        <img src={login}></img>
    </div>
    <div className="login_container"></div>
      <form>
        <div className="form_head">
            <h3>Login Here..</h3>
        </div>
        <div className="form_fields">
            <label>Email ID:</label>
            <input type="email"></input>
        </div>
      </form>
    </div>
  )
}

export default Login
