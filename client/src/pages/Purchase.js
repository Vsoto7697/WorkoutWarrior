import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/sneaker.png"
import resistanceIcon from "../assets/images/clothing.png"


export default function Collection() {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate()


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="collection d-flex flex-column align-items-center">
        <h2 className='title'>Add to Collection</h2>
        <div>
          <button className='sneaker-btn d-flex flex-column  align-items-center justify-content-center' onClick={() => navigate("/collection/sneaker")}>
            <img alt="sneaker" src={sneakerIcon} className="collection-icon" />
            Sneaker
          </button>
        </div>
        <div>
          <button className='clothing-btn d-flex flex-column  align-items-center justify-content-center' onClick={() => navigate("/collection/clothing")}>
            <img alt="clothing" src={clothingIcon} className="collection-icon" />
            Clothing
          </button>
        </div>
      </div>
    </div>
  );
}