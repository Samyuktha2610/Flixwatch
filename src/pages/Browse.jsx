import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import "./Browse.css";

const API_KEY = "17455a4c94c4652a23e92b965f76affa";
const BASE_URL = "https://api.themoviedb.org/3";

const genres = [
  { id: "all", name: "All" },
  { id: "popular", name: "Popular on FlixWatch" },
  { id: 28, name: "Action & Adventure" },
  { id: 16, name: "Anime" },
  { id: 10751, name: "Children & Family" },
  { id: 35, name: "Comedies" },
  { id: 99, name: "Documentaries" },
  { id: 18, name: "Dramas" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romantic" },
  { id: 878, name: "Sci‑fi & Fantasy" },
  { id: 10770, name: "TV Shows" },
];

const Browse = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [genreFilter, setGenreFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const carousels = useRef({});
  const sectionsRef = useRef({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    (async () => {
      const data = {};
      for (const g of genres.slice(1)) {
        const url = g.id === "popular"
          ? `${BASE_URL}/movie/popular?api_key=${API_KEY}`
          : `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${g.id}`;
        const res = await fetch(url);
        let movies = (await res.json()).results;
        if (g.id === "popular") {
          movies = movies.sort(() => 0.5 - Math.random()).slice(0, 15);
        }
        data[g.name] = movies;
      }
      setMoviesByGenre(data);
    })();
  }, []);

  useEffect(() => {
    if (genreFilter === "all") return;
    const g = genres.find(x => x.id.toString() === genreFilter);
    const name = g?.name;
    sectionsRef.current[name]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [genreFilter]);

  const handleSearch = () => setSearchQuery(searchTerm.trim().toLowerCase());
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();
  const scroll = (name, dir) => {
    const el = carousels.current[name];
    el?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  const showInfo = async (m) => {
    const res = await fetch(`${BASE_URL}/movie/${m.id}?api_key=${API_KEY}&append_to_response=credits`);
    setMovieDetails(await res.json());
  };

  const handleAction = (type) => {
    if (type === "signin") navigate("/login");
    if (type === "signup") navigate("/signup");
    if (type === "watchlist") navigate("/mylist");
    if (type === "more" && movieDetails?.genres?.length) {
      const gid = movieDetails.genres[0].id;
      const g = genres.find(x => x.id === gid);
      if (g) {
        setGenreFilter(g.id.toString());
        setTimeout(() => setMovieDetails(null), 600);
      }
    }
  };

  const filteredMovies = searchQuery
    ? Object.values(moviesByGenre)
        .flat()
        .filter(m => m.title?.toLowerCase().includes(searchQuery))
    : null;

  return (
    <div className="browse-container">
      <div className="overlay" />
      <div className="browse-content">
        <div className="top-bar">
          <div className="search-filter-group">
            <input
              className="search-bar"
              placeholder="Enter movie title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch}>🔍</button>
            <select
              className="genre-dropdown"
              value={genreFilter}
              onChange={e => setGenreFilter(e.target.value)}
            >
              {genres.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredMovies ? (
          <div className="search-results">
            {filteredMovies.length ? filteredMovies.map(m => (
              <div key={m.id} className="movie-card" onClick={() => showInfo(m)}>
                {m.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                ) : (
                  <div className="no-poster">No Image</div>
                )}
                <div className="movie-title">{m.title}</div>
              </div>
            )) : (
              <p className="no-results">No results for "{searchTerm}"</p>
            )}
          </div>
        ) : (
          genres.slice(1).map(g => {
            const list = moviesByGenre[g.name] || [];
            if (!list.length) return null;
            return (
              <section
                key={g.name}
                id={g.name}
                ref={el => (sectionsRef.current[g.name] = el)}
                className="genre-section"
              >
                <h2 className="genre-title">{g.name}</h2>
                <div className="carousel-wrapper">
                  <button className="arrow arrow-left" onClick={() => scroll(g.name, "left")}>‹</button>
                  <div className="carousel" ref={el => (carousels.current[g.name] = el)}>
                    {list.map(m => (
                      <div key={m.id} className="movie-card" onClick={() => showInfo(m)}>
                        {m.poster_path ? (
                          <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                        ) : (
                          <div className="no-poster">No Image</div>
                        )}
                        <div className="movie-title">{m.title}</div>
                      </div>
                    ))}
                  </div>
                  <button className="arrow arrow-right" onClick={() => scroll(g.name, "right")}>›</button>
                </div>
              </section>
            );
          })
        )}

        {movieDetails && (
          <div className="popup-overlay" onClick={() => setMovieDetails(null)}>
            <div className="popup" onClick={e => e.stopPropagation()}>
              <img
                className="popup-poster"
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
              <div className="popup-details">
                <h3>{movieDetails.title}</h3>
                <p className="rating">⭐ {movieDetails.vote_average.toFixed(1)}</p>
                <p className="description">{movieDetails.overview}</p>
                <p><strong>Release:</strong> {movieDetails.release_date}</p>
                <p><strong>Cast:</strong> {movieDetails.credits.cast.slice(0,5).map(c => c.name).join(", ")}</p>
                {user ? (
                  <>
                    <div className="btn-group">
                      <button className="watch-btn" onClick={() => navigate(`/watch/${movieDetails.id}`)}>▶ Watch Now</button>
                      <button className="watchlist-btn" onClick={() => {
                        addToWatchlist(movieDetails);
                        setMovieDetails(null);
                      }}>＋ Watchlist</button>
                    </div>
                    <div className="btn-group">
                      <button className="info-btn" onClick={() => handleAction("more")}>More Like This</button>
                    </div>
                  </>
                ) : (
                  <div className="btn-group">
                    <button className="watch-btn" onClick={() => handleAction("signin")}>Sign In to Watch</button>
                    <button className="watch-btn" onClick={() => handleAction("signup")}>Sign Up to Watch</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
