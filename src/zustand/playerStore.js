import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

const playerStore = (set, get) => ({
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: 0,

  resetPlayerStore: () => {
    console.log("it happened");
    set((state) => ({
      isPlaying: false,
      activeSong: {},
    }));
  },
  setActiveSong: (customObj) => {
    let temp;
    if (customObj?.data?.tracks?.hits) {
      temp = customObj.data.tracks.hits;
    } else if (customObj?.data?.properties) {
      temp = customObj?.data?.tracks;
    } else {
      temp = customObj.data;
    }
    set((state) => ({
      activeSong: customObj.song,
      currentSongs: temp,
      currentIndex: customObj.i,
      isActive: true,
    }));
  },
  nextSong: (newSongIndex) => {
    let temp;
    if (get().currentSongs[newSongIndex]?.track) {
      temp = get().currentSongs[newSongIndex]?.track;
    } else {
      temp = get().currentSongs[newSongIndex];
    }
    set((state) => ({
      activeSong: temp,
      currentIndex: newSongIndex,
      isActive: true,
    }));
  },
  prevSong: (newSongIndex) => {
    let temp;
    if (get().currentSongs[newSongIndex]?.track) {
      temp = get().currentSongs[newSongIndex]?.track;
    } else {
      temp = get().currentSongs[newSongIndex];
    }
    set((state) => ({
      activeSong: temp,
      currentIndex: newSongIndex,
      isActive: true,
    }));
  },
  playPause: (isPlayingValue) => {
    set((state) => ({ isPlaying: isPlayingValue }));
  },
  setGenreListId: (newGenreListId) => {
    set((state) => ({ genreListId: newGenreListId }));
  },
});
const usePlayerStore = create(devtools(playerStore));
export default usePlayerStore;
