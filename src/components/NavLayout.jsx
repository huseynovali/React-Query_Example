import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function NavLayout() {
  return (
    <div>
      <div className="w-full bg-slate-400">
        <div className="container m-auto  text-white py-3">
          <Link to='/' >Home</Link>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default NavLayout