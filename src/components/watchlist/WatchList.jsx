import React, { createContext, useContext, useState } from 'react';


const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
  
    const addToWatchlist = (movie) => {

      if (!watchlist.some(moviee => moviee.id === movie.id)){
        setWatchlist(prevWatchlist => [...prevWatchlist, movie]);
      }//this checks if the movie id is already present in the list beforew adding it
    };
  
  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
