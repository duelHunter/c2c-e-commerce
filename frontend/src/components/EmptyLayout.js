import React from 'react'
import { Outlet } from "react-router-dom";

function EmptyLayout() {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default EmptyLayout