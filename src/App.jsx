import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WatchlistProvider } from "./components/watchlist/WatchList";
import MovieSection from "./Pages/moviesection/MovieSection";
import MovieDesc from "./Pages/moviedesc/MovieDesc";
import SearchPage from "./Pages/search/SearchPage";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/home/Home";
import MovieSelect from "./Pages/Movies/MovieSelect";
import "./App.css";


const App = () => {
  return (
    <>
      <WatchlistProvider>
        <Router>
          <Routes>
            <Route exact path="/" Component={MovieSection} />
            <Route path="/movie/:id" Component={MovieDesc} />
            <Route path="/search/:title" Component={SearchPage} />
            <Route path="/movies" Component={MovieSelect} />
          </Routes>
        </Router>
      </WatchlistProvider>
    </>
  );
};
export default App;
