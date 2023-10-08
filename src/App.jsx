import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WatchlistProvider } from "./components/watchlist/WatchList";
import MovieSection from "./Pages/moviesection/MovieSection";
import MovieDesc from "./Pages/moviedesc/MovieDesc";
import SearchPage from "./Pages/search/SearchPage";
import MovieSelect from "./Pages/moviesection/MovieSelect";
import Watchlist from "./Pages/moviedesc/Watchlist";
import Genre from './Pages/moviedesc/Genre'

import "./App.css";



const App = () => {
  return (
    <>
    
      <WatchlistProvider>
        
        <Router>
          
          <Routes>
            <Route exact path="/" Component={MovieSection} />
            <Route path="/movies" Component={MovieSelect} />
            <Route path="/movie/:id" Component={MovieDesc} />
            <Route path="/search/:title" Component={SearchPage} />
            <Route path="/watchlist" Component={Watchlist} />
            
            <Route path="/genre" Component={Genre}/>
            
          </Routes>
        </Router>
      </WatchlistProvider>
    </>
  );
};
export default App;
