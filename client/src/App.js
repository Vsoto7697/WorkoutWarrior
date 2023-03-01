import React from "react";
// rename browserRouter as router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import pages and components
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Purchase from "./pages/Purchase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import SinglePurchase from "./components/SinglePurchase"
import Sneaker from "./components/Sneaker";
import Clothing from "./components/Clothing";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:type/:id" element={<SinglePurchase />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchase/sneaker" element={<Sneaker />} />
        <Route path="/exercise/clothing" element={<Clothing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
}

export default App;