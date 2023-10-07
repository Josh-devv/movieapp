import React, { createContext, useContext, useState } from 'react';
import Watchlist from '../../Pages/moviedesc/Watchlist';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);
  
    const addToWatchlist = (movie) => {

      if (!watchlist.some(moviee => moviee.id === movie.id)){
        setWatchlist(prevWatchlist => [...prevWatchlist, movie]);
      }

        
 
   
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
