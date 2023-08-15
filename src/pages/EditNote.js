import { React, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import './create-edit.css'
export default function EditNote({ setEdit }) {

    // function to get current date and time
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        return `${("0"+year).slice(-4)}-${("0" + month).slice(-2)}-${("0" + date).slice(-2)} ${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`;
    }

    // used to navigate
    const navigate = useNavigate();

    // used to read data passed from parent in navigate
    const location = useLocation();

    // get data
    const propsData = location.state;

    // data to be edited
    const [data, setData] = useState({ title: propsData.title, description: propsData.description })

    const handleSubmit = async (e) => {

        e.preventDefault();

        // get update date
        const date = getDate();

        // response from backend
        const response = await fetch("/api/updateNote",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newNote: [{
                        title: data.title,
                        description: data.description,
                        createdAt: propsData.createdAt,
                        updatedAt: date
                    }],
                    index: propsData.index,
                    email: localStorage.getItem("notesAppEmail")
                })
            }
        )

        // await response
        const json = await response.json();

        // if note not updated then alert message
        if (json.success === false) {
            alert(`${json.message}`);
        }

        setEdit(false);

        // go back to myNotes
        navigate(-1);
    }

    const onChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <div className='outerdiv'>
            <div className='heading'>
                Edit Note
            </div>
            <form autoComplete="on|off" onSubmit={handleSubmit}>
                <div className="titlediv">
                    <input type="text" className="" name='title' value={data.title} onChange={onChange} />
                </div>
                <div className="descriptiondiv">
                    <textarea type="text" className="" name='description' value={data.description} onChange={onChange} />
                </div>
                <div className='btn-div'>
                    <button type="submit" className="">Done</button>
                </div>
            </form>
        </div>
    )
}
