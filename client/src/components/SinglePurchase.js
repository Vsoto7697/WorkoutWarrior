import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Auth from '../utils/auth';
import { getSneakerById, getClothingById, deleteSneaker, deleteClothing } from '../utils/API';
import { formatDate } from '../utils/dateFormat';
import Header from "./Header";
import sneakerIcon from "../assets/images/sneaker-w.png"
import clothingIcon from "../assets/images/clothing-w.png"


export default function SinglePurchase() {
    const { id, type } = useParams();
    const [sneakerData, setSneakerData] = useState({})
    const [clothingData, setClothingData] = useState({})


    const loggedIn = Auth.loggedIn();
    const navigate = useNavigate()

    useEffect(() => {
        const displayCollection = async (collectionId) => {
            //get token
            const token = loggedIn ? Auth.getToken() : null;
            if (!token) return false;

            // fetch sneaker data by id
            if (type === "sneaker") {
                try {
                    const response = await getSneakerById(collectionId, token);
                    if (!response.ok) { throw new Error('something went wrong!') }

                    const sneaker = await response.json()
                    sneaker.date = formatDate(sneaker.date)
                    setSneakerData(sneaker)
                } catch (err) { console.error(err) }
            }

            // fetch clothing data by id
            else if (type === "clothing") {
                try {
                    const response = await getClothingById(collectionId, token);
                    if (!response.ok) { throw new Error('something went wrong!') }

                    const clothing = await response.json()
                    clothing.date = formatDate(clothing.date)
                    setClothingData(clothing)
                } catch (err) { console.error(err) }
            }
        }
        displayCollection(id)
    }, [id, type, loggedIn])

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    const handleDeleteCollection = async (collectionId) => {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        confirmAlert({
            title: "Delete item from Colllection",
            message: "Are you sure you want to delete this item from your collection?",
            buttons: [
                {
                    label: "Cancel",
                },
                {
                    label: "Delete",
                    onClick: async () => {
                        // delete sneaker data
                        if (type === "sneaker") {
                            try {
                                const response = await deleteSneaker(collectionId, token);
                                if (!response.ok) { throw new Error('something went wrong!') }
                            }
                            catch (err) { console.error(err) }
                        }

                        // delete clothing data
                        else if (type === "clothing") {
                            try {
                                const response = await deleteClothing(collectioneId, token);
                                if (!response.ok) { throw new Error('something went wrong!') }
                            }
                            catch (err) { console.error(err) }
                        }

                        // go back to collection
                        navigate("/collection")
                    }
                }
            ]
        });
    }

    return (
        <div className={type === "sneaker" ? "single-sneaker" : "single-clothing"}>
            <Header />
            <h2 className='title text-center'>Collection</h2>
            <div className="single-exercise d-flex flex-column align-items-center text-center">
                {type === "sneaker" && (<div className='sneaker-div '>
                    <div className='d-flex justify-content-center'><img alt="sneaker" src={sneakerIcon} className="collection-form-icon" /></div>
                    <p><span>Date: </span> {sneakerData.date}</p>
                    <p><span>Name: </span> {sneakerData.name}</p>
                    <p><span>Price: </span> {sneakerData.price}</p>
                    <button className='delete-btn' onClick={() => handleDeleteCollection(id)}>Delete Item</button>
                </div>)}
                {type === "clothing" && (<div className='clothing-div'>
                    <div className='d-flex justify-content-center'><img alt="clothing" src={clothingIcon} className="collection-form-icon" /></div>
                    <p><span>Date: </span> {clothingData.date}</p>
                    <p><span>Name: </span> {clothingData.name}</p>
                    <p><span>Price: </span> {clothingData.price}</p>
                    <button className='delete-btn' onClick={() => handleDeleteCollectione(id)}>Delete Item</button>
                </div>)}
            </div>
        </div>

    )
}