import { React, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './create-edit.css'
export default function CreateNote({setCreate}) {

    // function to get current date 
    
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        return `${("0"+year).slice(-4)}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)} ${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`;
    }

    // used to navigate
    const navigate = useNavigate();

    // data to be input in createNote
    const [data, setData] = useState({ title: "", description: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();

        // get date
        const date = getDate();

        // get response for creating note
        const response = await fetch("http://localhost:5000/api/createNote",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    myNotes: [{
                        title: data.title,
                        description: data.description,
                        createdAt: date,
                        updatedAt: date
                    }],
                    email: localStorage.getItem("notesAppEmail")
                })
            }
        )

        //get response 
        const json = await response.json();

        // if note not created then alert message
        if (json.success === false) {
            alert(`${json.message}`);
        }

        setCreate(false);
        navigate(0);

    }

    const onChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <div className='outerdiv'>
            <div className='heading'>
            Create Note
            </div>
            <form autoComplete="on|off" onSubmit={handleSubmit}>
                <div className="titlediv">
                    <input placeholder='Enter title' type="text" className="" name='title' value={data.title} onChange={onChange} />
                </div>
                <div className="descriptiondiv">
                    <textarea  placeholder='description' type="text" className="des-ip" name='description' value={data.description} onChange={onChange} />
                </div>
                <div className='bttn-div'>
                   <button type="submit" className="">Submit</button>
                </div>
            </form>
        </div>
    )
}
