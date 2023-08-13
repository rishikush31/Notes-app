import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import '../pages/customui.css';
import './Navbar.css'
import Modal from '../Modal';
import DpModal from '../DpModal';
import Login from '../pages/Login'
import Signup from '../pages/SignUp'
import CreateNote from '../pages/CreateNote'
import ProfilePic from '../pages/ProfilePic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

  const [create, setCreate] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [profilepic, setProfilepic] = useState(false);

  //image for no uploaded dp 
  let temp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLfp6+yrsbSxt7rh4+S+wsXS1dfW2drP0tS6v8LLz9HEyMrd4OG0ur3IzM7YRWk6AAAC3klEQVR4nO2ay5akIAxAISAiCv7/3w52PY7l2JBQCTML7rI33g4QklBKDQaDwWAwGAwGg8GgK6DivG7OuW31EaD/9yfvtDYvtN1jb4Xd5u+eMSbNXQUu339aWN9pOcDfCvxIuKmLwv6bwCMQ8gLgCgaHxCK+GKls0MEh1AyywyrpAFvdIDsI7gdYMAYZuXMRkQY6SS0FJKRB3pJCCjM2CHJLgQ5CDsMmshTYvfhA5OIkBCGHYRcw8BSDDP9K4LLSKQz8+QloBnlDsiug09KLxK5AOw9HGNgViFtBYjMEooFA3UDKCj8K7AmSaqC141agboWswGzQoBCGghbYC5aswH4i6HmBvZZ3ZAXuRhtKneS9Anv56KkKltuAfiTYMxOhiXgg0UpQuggtUS4oNdEMgkAjUZttXBREumtS9SjT2FLCIDVimNAKhv9EPoAV68CfGd8O1VnX00BqvKCwB9OwVwpnML2t4e+jPkDkSCs8BIbajWkEbsgr0ZYkDHvResdUmMCKDFduyPnhXsLY2Ot9CG7fREyauz5QTWvSJ4tsFDq8RHwCKi7u/f9vvtsSXDSyR2aCf/BEqI6PTjH6J9lDdfQ4vu1Xl5LVr4fKIyXaFPY5TkrcA5TfQzL3hzL/2YZtlrSAuIZfvv4hkjenyKLk71uNLFmy5ubZg+Ed9vvvWCycNyasyHLp08JuTJEAtdACcA7FxpKx5uLlXJPQ+7eRgIh4Gy1LfPmKTR9s3El801TEll1442Bab3GgPgUVJNqKKZZFeDu0lJS0Xr7u0NBc8Brohvbi27P4N4bmwLwKTyhNDutOPIHfD0AcrqHBt9xRRkDjBw/YQUaTA04BPc5pATeOlDRAPRFQX+ipIE4FfrLXRv3WlA4CJgz0ZzAi1cGsVFY6KVTyk8zlcHGoKMgb1FaC/HORFoVyFUf+uUgL5Ypa/EgelI8lf7F0Q/muCtrKU36tgC4UozAYDAaD/4U//rMgRSTDXgQAAAAASUVORK5CYII="

  // final image
  let suptemp;

  if (localStorage.getItem("notesAppProfilePic") === 'undefined') {
    suptemp = temp;
  }
  else {
    suptemp = localStorage.getItem("notesAppProfilePic");
  }

  // navigator for navigating to homepage on logout
  const navigate = useNavigate()

  // used to get current location
  const location = useLocation();

  // function to handle logout click
  const handleLogout = async () => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='popup-overlay'>
            <div className='popup-title'>Logout?</div>
            <div className='popup-message'>Are you sure you want to logout?</div>
            <hr />
            <button className='no' onClick={onClose}>No</button>
            <button className='yes' onClick={async () => {

              // remove authtoken and email
              localStorage.removeItem("notesAppAuthToken");
              localStorage.removeItem("notesAppEmail");
              localStorage.removeItem("notesAppName");
              localStorage.removeItem("notesAppProfilePic");

              //reload home page
              navigate("/")

              onClose();

              // window.location.reload();

            }}>Yes</button>
          </div>
        )
      }
    });
  }

  const handleDeleteUser = async () => {

    confirmAlert({

      customUI: ({ onClose }) => {
        return (
          <div className='popup-overlay'>
            <div className='popup-title'>Delete Account?</div>
            <div className='popup-message'>Are you sure you want to delete your acoount?</div>
            <hr />
            <button className='no' onClick={onClose}>No</button>
            <button className='yes' onClick={async () => {
              // delete from database
              await fetch("http://localhost:5000/api/deleteUser", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: localStorage.getItem("notesAppEmail") })
              })

              //delete data from local storage
              localStorage.removeItem("notesAppAuthToken");
              localStorage.removeItem("notesAppEmail");
              localStorage.removeItem("notesAppProfilePic");
              localStorage.removeItem("notesAppName");

              //go to home page
              navigate("/")
              onClose();

            }}>Yes</button>
          </div>
        )
      }
    });
  }


  const handleScroll = () => {
    let scrollTop = window.scrollY;
    if (document.getElementsByClassName('navbar2')[0]) {
      if (scrollTop) {
        // make background color
        document.getElementsByClassName('navbar2')[0].style.transition = "background-color 0.2s";
        document.getElementsByClassName('navbar2')[0].style.backgroundColor = "black";


      }
      else {
        // remove earlier property set
        document.getElementsByClassName('navbar2')[0].style.removeProperty("transition");
        document.getElementsByClassName('navbar2')[0].style.removeProperty("background-color");
      }
    }
  }
  document.addEventListener("scroll", handleScroll);
  return (
    <>
      {(location.pathname === '/') ?
        <div className='navbar2' onLoad={()=>{}}>
          <div className='nav-btn'>
            <div className='navitem-div'>
              <Link className='navitem n2' to="/">Home</Link>
            </div>
            <div className='navitem-div'>
              <Link className='navitem' to="/about">About</Link>
            </div>
            <div className='navitem-div'>
              <button className='navitem link-btn' onClick={() => { window.scrollTo({ top: 1045, behavior: "smooth" }); }}>Contact Us</button>
            </div>
            {(!localStorage.getItem("notesAppAuthToken"))
              ?
              <>
                <div className='navitem-div'>
                  <button className='link-btn navitem' onClick={() => { setLogin(true); }}>Login</button>
                </div>
                <div className='navitem-div'>
                  <button className='link-btn navitem' onClick={() => { setSignup(true); }}>SignUp</button>
                </div>
                {login ? <Modal onClose={() => { setLogin(false); }}><Login setLogin={setLogin} setSignup={setSignup}></Login></Modal> : ""}
                {signup ? <Modal onClose={() => { setSignup(false); }}><Signup setLogin={setLogin} setSignup={setSignup}></Signup></Modal> : ""}
              </>
              :
              <>
                <div className='navitem-div'>
                  <Link className='navitem' to="/mynotes">MyNotes</Link>
                </div>
                <div className='navitem-div'>
                  <button className='link-btn navitem' onClick={(e) => { e.stopPropagation(); setCreate(true) }}>CreateNote</button>
                </div>
                {create ? <Modal onClose={() => { setCreate(false); }}><CreateNote setCreate={setCreate}></CreateNote></Modal> : ""}
                <div className='navitem-div'>
                  <button className='link-btn navitem' onClick={handleLogout}>LogOut</button>
                </div>
                <div className='navitem-div'>
                  <button className='link-btn navitem' onClick={handleDeleteUser}>Delete My Account</button>
                </div>

              </>
            }
          </div>
          {(localStorage.getItem("notesAppAuthToken"))
            ? <>
              <div className='pp-div'>
                <button className='pp' onClick={() => { setProfilepic(true) }}><img alt='' src={`${suptemp}`} /></button>
                {profilepic ? <DpModal onClose={() => { setProfilepic(false); }}><ProfilePic></ProfilePic></DpModal> : ""}
              </div>
            </> : ""}
        </div >
        : <div className='navbar'>
          <button style={{background:"none",border:"none"}}className='back-btn' onClick={() => { navigate(-1) }}><FontAwesomeIcon icon={faArrowLeft} size='2xl'style={{color: "#ffffff",}} /> </button>
        </div>
      }</>
  )
}