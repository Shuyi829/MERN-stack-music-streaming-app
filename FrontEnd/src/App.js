import logo from './logo.svg';
import React, { useState,useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Search from './Search';


function App() {
  
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/search" element={<Search/>} />
            </Routes> 
          </Router>
    </div>
  );
}

export default App;
