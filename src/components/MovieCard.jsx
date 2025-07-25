import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card" onClick={() => onClick(movie)}>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    <p>{movie.title}</p>
  </div>
);

export default MovieCard;
