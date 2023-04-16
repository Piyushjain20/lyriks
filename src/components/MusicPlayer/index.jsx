import React, { useState, useEffect } from "react";

import usePlayerStore from "../../zustand/playerStore";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import Error from "../Error";

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, nextSong, prevSong, playPause } = usePlayerStore();
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (currentSongs.length) playPause(true);
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      playPause(false);
    } else {
      playPause(true);
    }
  };

  const handleNextSong = () => {
    playPause(false);

    if (!shuffle) {
      nextSong((currentIndex + 1) % currentSongs.length);
    } else {
      nextSong(Math.floor(Math.random() * currentSongs.length));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      prevSong(currentSongs.length - 1);
    } else if (shuffle) {
      prevSong(Math.floor(Math.random() * currentSongs.length));
    } else {
      prevSong(currentIndex - 1);
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar value={appTime} min="0" max={duration} onInput={(event) => setSeekTime(event.target.value)} setSeekTime={setSeekTime} appTime={appTime} />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
