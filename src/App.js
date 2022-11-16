import React from 'react';
import './App.css';
import Navbar from './Navbar';
import {Routes,Route} from 'react-router-dom';
import Bisection from './Root/Bisection';
import False from './Root/False';
import OnePoint from './Root/OnePoint'
import Newton from './Root/Newton';
import Newton_s from './Interpolation/Newton_s';
import Lagrange from './Interpolation/Lagrange';
import Secant from './Root/Secant'






function App() {



  return (
    <div className="App">
     <Navbar/>
     
     <Routes>
        <Route path="/home" element={<App/>}/>
        <Route path="/Bisection" element={<Bisection/>}/>
        <Route path="/False" element={<False/>}/>
        <Route path="/OnePoint" element={<OnePoint/>}/>
        <Route path="/Newton" element={<Newton/>}/>
        <Route path="/Newton's" element={<Newton_s/>}/>
        <Route path="/Lagrange" element={<Lagrange/>}/>
        <Route path="/Secant" element={<Secant/>}/>
      </Routes>
     
      
    </div>
  );
}

export default App;
