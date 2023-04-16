import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSongsByGenre } from "../utils/dataFetching";
import usePlayerStore from "../zustand/playerStore";

const Discover = () => {
  const [activeSong, isPlaying, genreListId, setGenreListId] = usePlayerStore((state) => [state.activeSong, state.isPlaying, state.genreListId, state.setGenreListId]);
  const [genre, setGenre] = useState(genres[genreListId]);

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`${genre.value}`],
    queryFn: fetchSongsByGenre,
    refetchOnMount: false,
  });

  const handleGenreChange = (event) => {
    setGenre(genres[event.target.options.selectedIndex]);
    setGenreListId(event.target.options.selectedIndex);
  };
  if (isError) return <Error />;
  return (
    <div className="flex flex-col">
      <div
        className="w-full flex justify-between items-center sm:flex-row
         flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genre.title}</h2>
        <select onChange={handleGenreChange} value={genre.value} className="bg-black text-gray-300 p-3  text-sm rounded-lg outline-none sm:mt-0 mt-5">
          {genres.map((obj, index) => (
            <option key={index} value={obj.value}>
              {obj.title}
            </option>
          ))}
        </select>
      </div>
      {isLoading && <Loader title="Loading Songs..." />}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data?.tracks} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
