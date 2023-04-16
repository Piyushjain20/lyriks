import SongBar from "./SongBar";
import usePlayerStore from "../zustand/playerStore";

const RelatedSongs = ({ data, isPlaying, activeSong, artistId, title }) => {
  const [setActiveSong, playPause] = usePlayerStore((state) => [state.setActiveSong, state.playPause]);
  const handlePlayClick = (song, i) => {
    setActiveSong({ song, data, i });
    playPause(true);
  };

  const handlePauseClick = () => {
    playPause(false);
  };
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">{title} :</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar key={i} song={song} i={i} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
