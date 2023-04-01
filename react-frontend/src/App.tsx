import { useState } from 'react'
import './App.css'
import { ShowAllClubs } from './components/club/ShowAllClubs'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppMenu } from './components/AppMenu';
import { HomePage } from './components/HomePage';
import { ClubPlayersDetails } from './components/club/ClubPlayersDetails';
import { ClubCompetitionsDetails } from './components/club/ClubCompetitionsDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>

      <Router>
        <AppMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ShowAllClubs />} />
          <Route path="/clubs/:clubId/players" element={<ClubPlayersDetails />} />
          <Route path="/clubs/:clubId/competitions" element={<ClubCompetitionsDetails />} />
        </Routes>    
      </Router>
      
    </React.Fragment>
  )
}

export default App
