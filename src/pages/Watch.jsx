import React from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import "./Watch.css";

const Watch = () => {
  const { id } = useParams();

  // For now, just using a demo YouTube video (later connect to real trailer/video API)
  const demoVideoId = "dQw4w9WgXcQ"; // Replace with TMDB trailer if needed

  return (
    <div className="watch-page">
      <h2 className="watch-heading">Now Playing</h2>
      <VideoPlayer videoId={demoVideoId} />
    </div>
  );
};

export default Watch;
