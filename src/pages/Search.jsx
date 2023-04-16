import { Error, Loader, SongCard } from "../components";
import { fetchSearchResult } from "../utils/dataFetching";

import usePlayerStore from "../zustand/playerStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Search = () => {
  const [activeSong, isPlaying] = usePlayerStore((state) => [state.activeSong, state.isPlaying]);
  const { searchTerm } = useParams();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["search", `${searchTerm}`],
    queryFn: fetchSearchResult,
    refetchOnMount: false,
  });

  const songs = data?.tracks?.hits.map((obj) => obj.track);
  if (isFetching) return <Loader title="Searching songs..." />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for "<span className="italic">{searchTerm}</span>"
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard song={song} i={i} key={i} isPlaying={isPlaying} activeSong={activeSong} data={data.tracks} />
        ))}
      </div>
    </div>
  );
};

export default Search;
