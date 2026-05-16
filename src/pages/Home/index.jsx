import React, { useEffect } from 'react';
import { logout } from '../../api/authentication';
import { getRestaurants } from '../../api/restuarants';

const Home = () => {

  useEffect(() => {
    getRestaurants().then((data) => console.log(data))
  }, [])

  return (
    <>
      <p>This is the home page</p>
      <button onClick={() => logout()}>Logout</button>
    </>
  )
}

export default Home;
