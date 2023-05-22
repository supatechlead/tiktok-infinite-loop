import { useState, useEffect } from "react";

import { createClient } from "pexels";

import BottomNav from "./components/BottomNav";
import VideoCard from "./components/VideoCard";

function App() {
  const [videos, setvideos] = useState([]);
  const [videosLoaded, setvideosLoaded] = useState(false);

  const randomQuery = () => {
    const queries = ["Funny", "Art", "Animals", "Coding", "Space"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const getVideos = (length) => {
    // Replace with your Pexels API Key
    const client = createClient("dOvWoS7hzpdMtz0GYxKK1YxyqGntJGiypkIZq1neiLf4a55t8myTx15h");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result) => {
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };

  useEffect(() => {
    getVideos(3);
  }, []);

  return (
    <main>
      <div className="slider-container">
        {videos.length > 0 ? (
          <>
            {videos.map((video, id) => (
              <VideoCard
                key={id}
                index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Nothing to show here</h1>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

export default App;