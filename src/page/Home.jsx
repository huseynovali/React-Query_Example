import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'

function Home() {
    const {user,getUser,getUserById} = useContext(UserContext);
 useEffect(()=>{
   getUser();
   getUserById(2)
 },[])


  return (
    <div>

    
    </div>
  )
}

export default Home