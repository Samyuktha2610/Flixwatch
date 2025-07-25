import React from "react";

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="video-player">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Movie Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
