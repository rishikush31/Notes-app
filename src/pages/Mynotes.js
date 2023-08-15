import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Navbar from '../Components/Navbar.jsx'
import "react-confirm-alert/src/react-confirm-alert.css";
import '../pages/customui.css';
import './Mynotes.css';
import CreateNote from '../pages/CreateNote'
import Modal from '../Modal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash ,faPlus} from '@fortawesome/free-solid-svg-icons'

export default function Mynotes({ handlefun }) {

  const [create, setCreate] = useState(false);

  // stores my notes
  const [myNotes, setMyNotes] = useState([]);

  // used to navigate to note page
  const navigate = useNavigate();

  const fetchMyNotes = async () => {

    // get email id
    const email = localStorage.getItem("notesAppEmail");

    // if no email means not logged in ,then return
    if (!email) {
      return;
    }

    // response from backend
    const response = await fetch("/api/getMyNotes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('notesAppEmail')
      })
    })

    //get the response
    const json = await response.json();

    // if getting notes is success
    if (json.success) {

      // get the notes array
      let array = json.data.myNotes;

      // add index to each element of notes array
      for (var i = 0; i < Object.keys(array).length; i++) {
        array[i]["index"] = `${i}`;
      }

      array.sort((a,b)=>{
        if(a.updatedAt!==b.updatedAt)
        {
          if(a.updatedAt<b.updatedAt)
          {
            return 1;
          }
          else
          {
            return -1;}
        }
        else
        {
          return 0
        }
      });      

      //set mynotes to this array 
      await setMyNotes(array);

    }
  }

  // make sure this runs after everytimes we go to the mynotes page becaus we dont know if the notes are updated
  useEffect(() => {
    fetchMyNotes();
  }, []);
  const handleDelete = async (e) => {

    e.stopPropagation();

    // get index of note to be deleted
    const ind = e.currentTarget.getAttribute("ind");

    confirmAlert({

      customUI: ({ onClose }) => {
        return (
          <div className='popup-overlay'>
            <div className='popup-title'>Delete?</div>
            <div className='popup-message'>Are you sure you want to delete this note?</div>
            <hr/>
            <button className='no' onClick={onClose}>No</button>
            <button className='yes' onClick={async () => {

              //perform deletion 
              await fetch("/api/deleteNote", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: localStorage.getItem('notesAppEmail'),
                  index: ind
                })
              })

              //update myNotes by refetching
              fetchMyNotes();
              onClose();
            }}>Yes</button>
          </div>
        )
      }
    })
  }
  async function handleRead(title, description, ind) {

    console.log(myNotes);

    // get created at
    const createdAt = myNotes[ind].createdAt;

    //get updated at
    const updatedAt = myNotes[ind].updatedAt;

    // create note-object to pass to note
    const note = {
      "title": title,
      "description": description,
      "index": ind,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    };

    // go to note
    navigate('/mynotes/note', { state: note });

  }
  return (
    <div>
      <Navbar></Navbar>
      <div className='content'>
        <div className='permanent-div'>
          <span className='page-heading'>
            Your Notes:
          </span>
          <span className='number-div'>
            Total number of notes : {Object.keys(myNotes).length}
          </span>
        </div>
        <div className='table-head'>
          <div className='title-head'>Title</div>
          <div className='record-head'>Record</div>
          <div className='delete-head'>Delete</div>
        </div>
        <hr style={{margin:"0 auto"}}/>
        {(Object.keys(myNotes).length > 0) ?
          myNotes.map((note) => {
            return (
              <>
                <div className='upper-box'>

                  <div key={note.index} className='note-container' onClick={() => { handleRead(note.title, note.description, note.index) }}>

                    <div id='title' className='title-box'>{note.title}</div>

                    <div className='time-box'>

                      <div>Updated on : {note.updatedAt}</div>
                      <div>Created on : {note.createdAt}</div>

                    </div>

                    <div className='btn-box'>

                      <div className='delete-btn'>
                        <button className='btn' style={{background:"none",border:"none"}} ind={note.index} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} style={{height:"1.2rem",color: "#ff0000",}}/></button>
                      </div>
                    </div>

                  </div>

                </div>
                <hr style={{margin:"0 auto"}} />
              </>
            )
          })
          : <div className='no-notes'> OOPS!.....NO NOTES AVAILABLE</div>
        }
        <div className='btn-div btn-add'>
          <button style={{border:"2px solid red",backgroundColor:"rgb(247, 189, 82)",borderRadius:"50%", height:"3rem"  , width:"3rem"}} onClick={(e) => { e.stopPropagation(); setCreate(true); }}><FontAwesomeIcon icon={faPlus} size='2x' style={{color: "#ffffff",}} /></button>
          {create ? <Modal onClose={() => { setCreate(false); }}><CreateNote setCreate={setCreate}></CreateNote></Modal> : ""}
        </div>
      </div>
    </div>
  )
}


