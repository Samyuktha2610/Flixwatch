import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import "./MyList.css";

const MyList = () => {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="mylist-container">
      <h2 className="mylist-title">My Watchlist</h2>
      {watchlist.length ? (
        <div className="mylist-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-card" onClick={() => navigate(`/watch/${movie.id}`)}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
              <div className="watchlist-title">{movie.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-watchlist">You haven't added any movies to your watchlist yet.</p>
      )}
    </div>
  );
};

export default MyList;
