import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import './Home.css'
import SimpleImageSlider from "react-simple-image-slider";
export default function Home() {

  
  const [data, setData] = useState({ name: `${localStorage.getItem("notesAppName")===null?"":localStorage.getItem("notesAppName")}`, email: `${localStorage.getItem("notesAppEmail")===null?"":localStorage.getItem("notesAppEmail")}` , textarea:""})

  const sliderImages = [
    {
      url: "https://muffingroup.com/blog/wp-content/uploads/2021/03/yeloow-heaer.jpg"
    },
    {
      url: "https://media.gettyimages.com/id/1155272555/photo/office-supply-items-on-yellow-work-desk.jpg?s=612x612&w=0&k=20&c=AZr9FLyVbzffpXH-xOxQvQW03KZEoOef0yF0Pb_6kd0="
    },
  ];
  
  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
}

  return (
    <div>
      <Navbar>
      </Navbar>
      <div className='content2' style={{width:"100%"}}>
        <SimpleImageSlider
          style={{ margin: "0rem auto 1rem auto",backgroundRepeat:"no-repeat",backgroundPosition:"fixed" }}
          width={"100%"}
          height={"100vh"}
          images={sliderImages}
          showNavs={true}
          showBullets={true}
          autoPlayDelay={3}
          autoPlay={true}
          >
        </SimpleImageSlider>
        <hr style={{width:"100%"}}/>
            <div style={{textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",textAlign:"center",margin:"0 auto",minWidth:"40%",width:"80%",top:"33vh",left:"0",right:"0",position:"absolute",fontSize:"4.5rem",fontWeight:"500",color:"white"}} className='nomo'>This is your own notes app <br/> Create and Enjoy :)</div>
      </div>
      <section className="info-container">
        <h1 className="h-primary center">Our features</h1>
        <div className="info">
            <div className="box">
                <img src={require("../trash.png")} alt="#"/>
                <h2 className="h-secondary">No wastage of paper</h2>
                <p>Switch to online means of making notes. Easy to manage and maintain. No wastage of paper. </p>
            </div>
            <div className="box">
                <img src={require("../edit.jpeg")} alt="#"/>
                <h2 className="h-secondary">Edit Notes</h2>
                <p>You can edit any note any time and multiple times. Make drafts and work on them by editing them continually.</p>
            </div>
            <div className="box">
                <img src={require("../calender.jpg")} alt="#"/>
                <h2 className="h-secondary">Keep record of notes</h2>
                <p>Maintain record of creation of note. Also maintain record for last updation of note so that you never forget note record.</p>
            </div>
        </div>
    </section>
      <div id='Feedback-Form-div'  className='Feedback-Form-div'>
      <hr style={{width:"100%"}}/>
        <div className='formHeading'>
          Feedback or Complaint ? Get us here :
        </div>
        <form className='form' onSubmit={(e)=>{e.preventDefault();e.stopPropagation();document.getElementsByClassName("form-Element-textarea")[0].value=""}}>
          <div className='form-Element-div select-div'>
          {`Choose type :  `}
          <select >
          <option value="Feedback">Feedback</option>
          <option value="Help">Help</option>
          <option value="Complaint">Complaint</option>
          </select>
          </div>
          <div className='form-Element-div '>
            Enter Your Name : 
            <br/>
            <input type="text" name="name" placeholder='Name' onChange={onChange} value={data.name} className="form-Element-name" />
          </div>
          <div className='form-Element-div'>
            Enter Your Contact Email :
            <br/>
            <input type="email" name="email" placeholder='Email' onChange={onChange} value={data.email} className="form-Element-email" />
          </div>
            Enter your message for us :
            <br/>
          <div className='form-Element-div'>
            <textarea rows="10" cols="100%" className='form-Element-textarea' onChange={onChange} value={data.textarea} name="textarea"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
