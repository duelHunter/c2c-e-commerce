import React from 'react'
import { Outlet } from "react-router-dom";

function EmptyLayout() {
  return (
    <div className='dark'>
        <Outlet />
    </div>
  )
}

export default EmptyLayout