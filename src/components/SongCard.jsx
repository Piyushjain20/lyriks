import { Link } from "react-router-dom";
import usePlayerStore from "../zustand/playerStore";
import PlayPause from "./PlayPause";
import CoverArt from "../assets/coverArt.png";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const [playPause, setActiveSong] = usePlayerStore((state) => [state.playPause, state.setActiveSong]);

  const handlePlayClick = () => {
    setActiveSong({ song, data, i });
    playPause(true);
  };

  const handlePauseClick = () => {
    playPause(false);
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-sm group-hover:flex ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70 " : "hidden"}`}>
          <PlayPause song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} isPlaying={isPlaying} activeSong={activeSong} />
        </div>
        <img alt="song_cover" src={song.images ? song.images?.coverart : CoverArt} className="rounded-sm w-full h-full" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : "/top-artists"}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  );
};
export default SongCard;
