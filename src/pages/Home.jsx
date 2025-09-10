import React from 'react';
import Slider from '../components/Slider';
import NearlyExpiry from '../components/NearlyExpiry';
import Expired from '../components/Expired';

const Home = () => {
  return (
    <div>
      <Slider />
      <NearlyExpiry />
      <Expired />
    </div>
  );
};

export default Home;