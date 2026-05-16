import React, { useEffect } from 'react';
import { getRestaurants } from '../../api/restuarants';

const Home = () => {

  useEffect(() => {
    getRestaurants().then((data) => console.log(data))
  }, [])

  return (
    <>
      <p>This is the home page</p>
    </>
  )
}

export default Home;
