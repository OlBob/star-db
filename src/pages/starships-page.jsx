import React from 'react';
import { StarshipList } from '../components/sw-components';
import { useNavigate } from 'react-router-dom';

const StarshipPage = () => {

  const navigate = useNavigate()

  return (
    <StarshipList onItemSelected={
      (itemId) => {
        console.log(itemId)
        navigate(itemId)
      }
    }
    />
  );
};

export default StarshipPage;