import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    const exists = watchlist.some((m) => m.id === movie.id);
    if (!exists) {
      setWatchlist((prev) => [...prev, movie]);
      toast.success("Added to Watchlist");
    } else {
      toast.info("Already in Watchlist");
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
    toast.warn("Removed from Watchlist");
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
