import React from 'react'
import { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import '../pages/customui.css';
import './login-signin.css';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setLogin, setSignup }) {

    let navigate = useNavigate();

    //state for credential   
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        //response from backend   
        const response = await fetch("/api/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                password: credentials.password,
                email: credentials.email,
                location: credentials.geolocation
            })
        })

        const json = await response.json();

        // if signup is failed ,alert the respective error
        if (!json.success) {

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='popup-overlay'>
                            <div>Problem:</div>
                            <div>{json.message}</div>
                            <button onClick={onClose}>ok</button>
                        </div>
                    )
                }
            });

        }

        // if signup is success ,navigate to login page
        if (json.success) {
            setLogin(true);
            setSignup(false) ;
        }
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <div className='mainBody'>
            <div className='heading'>
                Sign In
            </div>
            <div className='container' style={{ margin: '1rem' }}>
                <form autoComplete="on|off" onSubmit={handleSubmit}>
                    <div className="formElementDiv">
                        <input type="text" className="formElement" name='name' value={credentials.name} placeholder='Name' onChange={onChange} />
                    </div>
                    <div className="formElementDiv">
                        <input type="email" autoComplete="username" className="formElement" id="exampleInputEmail1" name='email' value={credentials.email} placeholder='Email Id' onChange={onChange} />
                    </div>
                    <div className="formElementDiv">
                        <input type="password" autoComplete="current-password" className="formElement" id="exampleInputPassword1" name='password' value={credentials.password} placeholder='Password' onChange={onChange} />
                    </div>
                    <div className="formElementDiv">
                        <input type="text" className="formElement" name='geolocation' value={credentials.geolocation} placeholder='Address' onChange={onChange} />
                    </div>
                    <div className="formElementDiv">
                        <button type="submit" className="btnsub">Submit</button>
                    </div>
                </form>
                
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

            </div>
            <div className='footer'>
                <div className='footerElementhr'>
                    <hr />
                </div>
                <div className='footerElement'>
                    Already a user?
                    <button className='link' onClick={() => { setLogin(true); setSignup(false) }}>Login</button>
                </div>
            </div>
        </div>
    )
}
