import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth"
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn()

  return (
    <div className="homepage">
      <Header />
      <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">Hype Tracker</h1>
        <p className="home-text">
          Love collecting hyped Sneakers? Clothing? Or both? Track your collection and stay fly
          with us.
        </p>
        {loggedIn ?
          (<button className="home-btn" onClick={() => navigate("/purchase")}>Add to Collection</button>) :
          (<button className="home-btn" onClick={() => navigate("/signup")}>Get Started</button>)}
      </Container>
    </div>
  );
}