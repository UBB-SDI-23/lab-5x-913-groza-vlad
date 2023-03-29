import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ShowAllClubs } from './components/club/ShowAllClubs'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <ShowAllClubs />
      
    </React.Fragment>
  )
}

export default App
