import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './page/Home'
import UserDetail from './page/UserDetail'
import NavLayout from './components/NavLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<NavLayout />} >
          <Route index element={<Home />} />
          <Route path="/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
