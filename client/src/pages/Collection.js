import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth"
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import sneakerIcon from "../assets/images/sneaker.png"
import clothingIcon from "../assets/images/clothing.png"

export default function History() {
  const [userData, setUserData] = useState({});
  const [collectionData, setCollectionData] = useState([])
  const [displayedItems, setDisplayedItems] = useState(6);

  const loggedIn = Auth.loggedIn();
  let currentDate;

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    const getUserData = async () => {
      try {
        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token)

        if (!response.ok) {
          throw new Error("something went wrong!")
        }

        const user = await response.json()

        // combine sneaker and clothing data together
        if (user.sneaker && user.clothing) {
          const sneaker = user.clothing;
          const collection = sneaker.concat(clothing);

          // sort collection data by date
          collection.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })

          //format date in exercise data
          collection.forEach(item => {
            item.date = formatDate(item.date)
          });

          setUserData(user);
          setCollectionData(collection)
        }
      } catch (err) { console.error(err) }
    };
    getUserData();
  }, [loggedIn, userData])

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }


  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>History</h2>
        {collectionData.length ?
          (<div className='history-data'>
            {/* map the collection data  */}
            {collectionData.slice(0, displayedItems).map((collection) => {
              let dateToDisplay;
              if (collection.date !== currentDate) {
                currentDate = collection.date;
                dateToDisplay = collection.date;
              }
              return (
                <div className='history-div d-flex' key={collection._id}>
                  <div className='date d-flex align-items-center'>{dateToDisplay}</div>
                  <Link className='text-decoration-none' to={`/history/${collection.type}/${collection._id}`}>
                    {collection.type === "sneaker" ? (
                      <div className="history-card sneaker-title d-flex">
                        <div className='d-flex align-items-center'><img alt="sneaker" src={sneakerIcon} className="history-icon" /></div>
                        <div>
                          <p className='history-name'>{collection.name}</p>
                        </div>
                      </div>) : (
                      <div className="history-card clothing-title d-flex">
                        <div className='d-flex align-items-center'><img alt="clothing" src={clothingIcon} className="history-icon" /></div>
                        <div >
                          <p className='history-name'>{collection.name}</p>
                        </div>
                      </div>)}
                  </Link>
                </div>
              )
            })}
            {/* show more items  */}
            {exerciseData.length > displayedItems ?
              (<div className='d-flex justify-content-center'>
                <button className='show-btn' onClick={showMoreItems}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  Show More
                </button>
              </div>)
              : null}
          </div>)
          :
          (<div>
            <h3 className='history-text'>Nothing in your collection yet...</h3>
            <Link to="/collection"><button className='home-btn'>Add to Collection</button></Link>
          </div>
          )}
      </div >
    </div >
  )
}