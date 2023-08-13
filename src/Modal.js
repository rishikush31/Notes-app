import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(1000,1000,1000)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '40%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {
  
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "94%", marginTop: "2%" }} onClick={onClose}>X</button>
        <div style={{height:'100%'}}>
        {children}
        </div>
      </div>
    </>,
    document.getElementById('root')
  )
}