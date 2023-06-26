import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function NavLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    setIsAuthenticated(token);
  }, []);

  return (
    <div>
      <div className="w-full bg-slate-400">
        <div className="container m-auto  text-white py-3 flex justify-between">
          <Link to='/' className='px-3 py-2' >Home</Link>

          <div className="left flex">
            {
              isAuthenticated ?
                <>
                  <Link to="admin" className='px-3 py-2 mx-3'>Admin Page</Link>
                  <button className='px-3 py-2 bg-slate-500 rounded-md' onClick={() => {

                    setIsAuthenticated(false)
                    localStorage.clear();
                    <Navigate to='/' />
                    window.location.reload()
                  }}>Logout</button>
                </>
                :
                <Link to='/login' className='px-3 py-2 bg-slate-500 rounded-md'>Login</Link>
            }


          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default NavLayout