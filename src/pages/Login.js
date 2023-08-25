import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
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
    const response = await fetch("/api/login", {
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
              <hr />
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

        <LoginSocialGoogle
          client_id={"118951462616-r1i3j0fjl3bcr3snhfk90fvdl81qa87u.apps.googleusercontent.com"}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={async ({ provider, data }) => {
            console.log(data);
            const response = await fetch("/api/socialLogin", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: data.email,
                name: data.name,
                myProfilePic: data.pitcure
              })
            })

            const json = await response.json();

            localStorage.setItem("notesAppEmail", json.email)
            localStorage.setItem("notesAppAuthToken", json.authToken)
            localStorage.setItem("notesAppName", json.name)
            localStorage.setItem("notesAppProfilePic", json.myProfilePic)

            navigate('/')

          }}
          onReject={(err) => {
            console.log(err);
          }}>
          <GoogleLoginButton style={{margin:"1rem auto",width:"25rem",text:"none",borderRadius:"10rem"}}/>
        </LoginSocialGoogle>
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
