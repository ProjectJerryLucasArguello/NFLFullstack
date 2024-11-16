import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './searchpages/homePage';
import SeasonSearch from './searchpages/seasonSearch';
import TeamSearch from './searchpages/teamSearch';
import PlayerSearch from './searchpages/playerSearch';
import PositionSearch from './searchpages/positionSearch';
import AdvanceSearch from './searchpages/advanceSearch'; // Import the component for advanced search
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='app-background'>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/season" element={<SeasonSearch />} />
          <Route path="/team" element={<TeamSearch />} />
          <Route path="/player" element={<PlayerSearch />} />
          <Route path="/position" element={<PositionSearch />} />
          <Route path="/advance-search" element={<AdvanceSearch />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
