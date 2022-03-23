import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { DataProvider } from "./GlobalContext"
import Header from './Components/HeaderComponents/Header';
import MainPages from './Components/MainComponents/MainPages';

function App() {
  return (
    
      <DataProvider>
        <Router>
        <div className='App'>
          <Header />
         <MainPages/>
        </div>
        </Router>
      </DataProvider>
  

  );
}

export default App;
