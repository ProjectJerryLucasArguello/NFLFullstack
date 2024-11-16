import React from 'react';
import Logo from '../Images/nfl-logo-0.webp';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './homePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/advance-search');
  };

  return (
    <div className="home-container">
      <motion.div
        className="left-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="opening-text text-3xl space-y-5 pt-5 w-full max-w-lg p-4 text-white">
          <p className='text-1'>
            Take a look at all the sports teams through history!
          </p>
          <p className='text-2'>
            All the records of your favorite teams and players are all organized
            for your preferences.
          </p>
        </div>
        <div className="advancebutton">
          <button onClick={handleClick} className="rounded-md border border-white text-white px-4 py-2 hover:bg-white hover:text-black text-2xl">
            Advance Search
          </button>
        </div>
      </motion.div>
      <motion.div
        className='right-content scale-100'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={Logo} alt="NFL Logo" />
      </motion.div>
    </div>
  );
};

export default HomePage;
