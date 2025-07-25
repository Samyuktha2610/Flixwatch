import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const API_KEY = "17455a4c94c4652a23e92b965f76affa";

const Home = () => {
  const [posterRows, setPosterRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosters = async () => {
      const urls = [
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      ];

      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      const allMovies = data.flatMap(d => d.results).filter(m => m.poster_path);

      // Shuffle and split into 5 rows of unique posters
      const shuffled = allMovies.sort(() => 0.5 - Math.random());
      const rows = Array.from({ length: 5 }, (_, i) =>
        shuffled.slice(i * 20, i * 20 + 20)
      );
      setPosterRows(rows);
    };

    fetchPosters();
  }, []);

  return (
    <div className="home-container">
      <div className="poster-wall">
        {posterRows.map((row, i) => (
          <div key={i} className={`poster-row row-${i % 2 === 0 ? "even" : "odd"}`}>
            {row.map(movie => (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="overlay">
        <div className="content">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <button className="get-started-btn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
