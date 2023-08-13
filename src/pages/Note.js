import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { useLocation } from "react-router-dom"
import Navbar from '../Components/Navbar.jsx'
import Modal from '../Modal.js'
import EditNote from './EditNote.js'
import './notes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'

export default function Note() {

  const [edit,setEdit] = useState(false);

  //used to read data tranfered using navigate
  const location = useLocation();

  // for text area
  const textRef = useRef();

  // get transfered data
  const propsData = location.state;

  useEffect(() => {
    if(textRef && textRef.current){
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [propsData.description]);

  return (
    <div>
      <Navbar></Navbar>
      <div className='content'>
      <div className="head">
        <div className="title">
          {propsData.title}
        </div>
        <div className="time">
          <div>
            updated at : {propsData.updatedAt}
          </div>
          <div>
            created at : {propsData.createdAt}
          </div>
        </div>
      </div>
      <div className="description">
        <textarea className='description-area form-control' ref={textRef} readOnly rows="100%" cols="100%">
        {propsData.description}
        </textarea>
      </div>
      <div className="btn-notes">
        <div className='btndiv'>
          <button className='btn-edit' style={{bottom:"2rem",right:"3rem",border:"2px solid red",backgroundColor:"rgb(247, 189, 82)",borderRadius:"50%", height:"4rem"  , width:"4rem"}} onClick={()=>{setEdit(true);}}><FontAwesomeIcon icon={faPenToSquare} size='2x' style={{color: "#ffffff" }} /></button>
        </div>
      </div>
      {edit?<Modal onClose={()=>{setEdit(false);}}><EditNote setEdit={setEdit}></EditNote></Modal>:""}
    </div>
    </div>
  )
}