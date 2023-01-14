import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './components/main'
import Test from './components/test'
import Tasks from './components/tasks'
import Navbar from './components/navbar';
import menuIcon from './assets/menu.png'
import LoginSignup from './components/login-signup';

import './App.css';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <img src={menuIcon} alt="menu icon" onClick={handleMenuClick} />
      <div className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <Routes>
        <Route exact path='/test' element={<Test />}></Route>
        <Route exact path='/mytasks' element={<Tasks />}></Route>
        <Route exact path='/login' element={<LoginSignup />}></Route>
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  )
}
export default App