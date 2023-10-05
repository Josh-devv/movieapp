import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (movie) => {
      setWatchlist(prevWatchlist => [...prevWatchlist, movie]);
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
