import { useState } from 'react'
import './App.css'
import { ShowAllClubs } from './components/club/ShowAllClubs'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from './components/HomePage';
import { ClubPlayersDetails } from './components/club/ClubPlayersDetails';
import { ClubCompetitionsDetails } from './components/club/ClubCompetitionsDetails';
import { AddClub } from './components/club/AddClub';
import { UpdateClub } from './components/club/UpdateClub';
import { DeleteClub } from './components/club/DeleteClub';
import { ClubsTrophies } from './components/club/ClubTrophiesReport';
import { ClubsPlayersAge } from './components/club/ClubPlayersReport';
import { ShowAllPlayers } from './components/player/ShowAllPlayers';
import { ClubHomePage } from './components/club/ClubHomePage';
import { PlayerHomePage } from './components/player/PlayerHomePage';
import { PlayerClubDetails } from './components/player/PlayerClubDetails';
import { DeletePlayer } from './components/player/DeletePlayer';
import { AddPlayer } from './components/player/AddPlayer';
import { PlayerFilterByAge } from './components/player/FilterPlayers';
import { UpdatePlayer } from './components/player/UpdatePlayer';
import { CompetitionHomePage } from './components/competition/CompetitionHomePage';
import { ShowAllCompetitions } from './components/competition/ShowAllCompetitions';
import { DeleteCompetition } from './components/competition/DeleteCompetition';
import { CompetitionClubsDetails } from './components/competition/CompetitionClubsDetails';
import { UpdateCompetition } from './components/competition/UpdateCompetition';
import { AddCompetition } from './components/competition/AddCompetition';

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/club-management" element={<ClubHomePage />} />
          <Route path="/clubs" element={<ShowAllClubs />} />
          <Route path="/clubs/:clubId/players" element={<ClubPlayersDetails />} />
          <Route path="/clubs/:clubId/competitions" element={<ClubCompetitionsDetails />} />
          <Route path="/clubs/add" element={<AddClub />} />
          <Route path="/clubs/:clubId/delete" element={<DeleteClub />}/>
          <Route path="/clubs/:clubId/edit" element={<UpdateClub />}/>
          <Route path='clubs/most-trophies' element={<ClubsTrophies />} />
          <Route path='clubs/avg_age' element={<ClubsPlayersAge />}/>

          <Route path="/player-management" element={<PlayerHomePage />} />
          <Route path="/players" element={<ShowAllPlayers />} />
          <Route path="/players/:playerId/club" element={<PlayerClubDetails />} />
          <Route path="/players/add" element={<AddPlayer />} />
          <Route path="/players/:playerId/delete" element={<DeletePlayer />}/>
          <Route path='/players/filter' element={<PlayerFilterByAge />} />
          <Route path="/players/:playerId/edit" element={<UpdatePlayer />}/>

          <Route path="/competition-management" element={<CompetitionHomePage />} />
          <Route path="/competitions" element={<ShowAllCompetitions />} />
          <Route path="/competitions/:competitionId/delete" element={<DeleteCompetition />}/>
          <Route path="/competitions/:competitionId/clubs" element={<CompetitionClubsDetails />} />
          <Route path="/competitions/:competitionId/edit" element={<UpdateCompetition />}/>
          <Route path="/competitions/add" element={<AddCompetition />} />
          
        </Routes>    
      </Router>
      
    </React.Fragment>
  )
}

export default App
