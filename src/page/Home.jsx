import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext'

function Home() {
    const {user,getUser,getUserById} = useContext(UserContext);
 useEffect(()=>{
   getUser();

 },[])


  return (
    <div>

    
    </div>
  )
}

export default Home