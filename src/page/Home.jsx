import React, { useContext } from 'react'
import { CommonContext } from '../Context/CommonContext'

function Home() {
    const user = useContext(CommonContext);

  return (
    <div>{user}
   { console.log(user)}
    
    </div>
  )
}

export default Home