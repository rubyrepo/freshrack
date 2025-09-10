import React from 'react';
import Slider from '../components/Slider';
import NearlyExpiry from '../components/NearlyExpiry';
import Expired from '../components/Expired';
import FoodCategories from '../components/FoodCategories';
import ExpiryStats from '../components/ExpiryStats';

const Home = () => {
  return (
    <div>
      <Slider />
      <ExpiryStats />
      <FoodCategories />
      <NearlyExpiry />
      <Expired />
    </div>
  );
};

export default Home;