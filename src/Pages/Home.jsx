import React, { useState } from 'react'
import Create from '../Components/Creater/Create'
import Receive from '../Components/Receiver/Receive'

const Home = () => {
    const[editMod,setEditMod] = useState(true)
  return (
    <div className=' relative flex w-full h-screen p-[1rem] ' >
        {
            editMod &&       <Create/>

        }
      <Receive/>
    </div>
  )
}

export default Home
