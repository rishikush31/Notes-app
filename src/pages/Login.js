import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import '../pages/customui.css';
import './login-signin.css';

export default function Login({ setLogin, setSignup }) {

  //states of credentials 
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // navigate for navigating to homepage after login
  let navigate = useNavigate();

  // handle submit for submit login form
  const handleSubmit = async (event) => {

    event.preventDefault();

    // response from backend
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })

    // object from response
    const json = await response.json();

    // if success===false that is login failed
    if (json.success === false) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='popup-overlay'>
              <div className='popup-title'>Problem:</div>
              <div className='popup-message'>{`${json.message}`}</div>
              <hr/>
              <button className='ok' onClick={onClose}>ok</button>
            </div>
          )
        }
      });

    }
    else {

      // set email and authtoken in local storage
      localStorage.setItem("notesAppEmail", credentials.email)
      localStorage.setItem("notesAppAuthToken", json.authToken)
      localStorage.setItem("notesAppName", json.name)
      localStorage.setItem("notesAppProfilePic", json.myProfilePic)
      // navigate to home page

      navigate('/')

      window.location.reload();
    }
  }

  // for credential input
  const onChange = (event) => {

    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  }
  return (
    <div className='mainBody'>
      <div className='heading'>
        Login
      </div>
      <div className='container' style={{ margin: '1rem' }}>
        <form autoComplete="on|off" onSubmit={handleSubmit}>
          <div className="formElementDiv">
            <input type="email" className="formElement" autoComplete="username" id="ipemail" name='email' value={credentials.email} placeholder='Email Id' onChange={onChange} />
          </div>
          <div className="formElementDiv">
            <input type="password" className="formElement" autoComplete="current-password" id="impassword" name='password' value={credentials.password} placeholder='Password' onChange={onChange} />
          </div>
          <div className="formElementDiv">
            <button type="submit" className="btnsub">Submit</button>
          </div>
        </form>
      </div>
      <div className='footer'>
        <div className='footerElementhr'>
          <hr />
        </div>
        <div className='footerElement'>
          New User ?
          <button className='link' onClick={() => { setLogin(false); setSignup(true) }}>Sign up</button>
        </div>
      </div>
    </div>
  )
}
