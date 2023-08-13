import React from 'react'
import { Outlet } from 'react-router-dom'

export default function tempHead() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}
