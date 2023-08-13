import React from 'react'
import Navbar from '../Components/Navbar'
import '../pages/About.css'
export default function About() {
  
  return (
    <>
    <Navbar></Navbar>
    <div className='content'>
      <section className='what'>
        <div className='what-heading'>What is this Website?</div>
        <div className='what-text'>This is a Notes making website created by <a href='http://google.com/' rel="noreferrer" target="_blank" >Rishi Srivastava</a>. It was created with React technology and using Mongo Database. We also provide facility of profile picture management. User can check the source code at <a href='http://google.com/' rel="noreferrer" target="_blank" >notesapp.code</a> .<br/><br/> All the external sources are used for eductational purpose only. The creator doesnot seek any professional or commercial benefit from the website. Creator does not claim any logo and picture used in website production. User can contact creator on [rishikush31@gmail.com] or <a href='http://google.com/' rel="noreferrer" target="_blank" >LinkedIn</a>. <br/><br/>Any further reproduction or copying of the content of this website is subject to copyright protection under the Copright Act 1968.</div>
      </section>
        <hr className='about-hr'/>
      <section className='features'>
        <div className='features-heading'>Features :-</div>
        <div className='features-text'>
          Our website provide numerous features :- <br/>
          <ul>
            <li>Create Notes</li>
            <li>Edit Notes</li>
            <li>Delete Notes</li>
            <li>Maintain Record of Notes</li>
            <li>Upload and Delete Profile Picture</li>
          </ul>
        </div>        
      </section>
      <hr className='about-hr'/>
      <section className='technology'>
        <div className='technology-heading'>Technology Used-</div>
        <div className='technology-text'>
        This website is made with MERN Stack technology .
        MERN Stack is a compilation of four different technologies that work together to develop dynamic web apps and websites.
        It includes M (Mongo-DataBase) , E (ExpressJS) , R (ReactJS) , N (NodeJS) .
        </div>        
        <div className='technology-box'>
         <div className='technology-item mongo' onClick={()=>{window.open("https://www.mongodb.com/","myWindow");}}></div>
         <div className='technology-item express' onClick={()=>{window.open("https://expressjs.com/","myWindow");}}></div>   
         <div className='technology-item react' onClick={()=>{window.open("https://react.dev/","myWindow");}}></div>
         <div className='technology-item node' onClick={()=>{window.open("https://nodejs.org/en/docs","myWindow");}}></div>
        </div>
        <div className='technology-char-box'>
          <div className='char'>M</div>
          <div className='char'>E</div>
          <div className='char'>R</div>
          <div className='char'>N</div>
        </div>
      </section>
        <hr className='about-hr'/>
    </div>
    </>
  )
}
