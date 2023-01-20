import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import TravelPlansList from './TravelPlansList'
import TravelPlanAddForm from './TravelPlanAddForm'
// import { HashRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/travelplans").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])

  return (
    <Router>
    <div className="App">
      <Navbar/>
        <div className="content">
          <div> Hello, Andra! </div>
          <TravelPlansList/>
           {
           /* <div>
            {(typeof backendData.users === 'undefined') ? 
            (
              <p> Loading... </p>
            ) : 
            (
              backendData.users.map((user, i) => (
                <p key={i}> {user} </p>
              ))
            )}
          </div> */
          }
          <Routes>
            <Route exact path="/">
            </Route>
            <Route exact path="/:item">
            </Route>
          </Routes>
        </div>
    </div>
  </Router>
   
  );
}

export default App