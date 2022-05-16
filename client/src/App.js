import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import './App.css';
import './views/login.css';

import React from 'react';
import AddFood from './views/AddFood';
import Chart from './views/Chart';
import Display from './views/Display';
import EditFood from './views/EditFood';
import Login from './views/Login'
import Registere from './views/Registere';


function App() {
  //userLoggedIn
  return (
    <div className="App">
      <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/reg' element={<Registere/>} />
        <Route path='/' element={<Login />} />
        <Route path='/food' element={<Display />} />
        <Route path='/add' element={<AddFood/>} />
        <Route path='/food/editFood/:id/:username' element={<EditFood/>} />
        <Route path='/chart/:username' element={<Chart/>} />




        </Routes>
        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
