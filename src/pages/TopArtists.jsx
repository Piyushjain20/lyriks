import { Error, Loader, ArtistCard } from "../components";
import { fetchTopWorldwide } from "../utils/dataFetching";

import usePlayerStore from "../zustand/playerStore";
import { useQuery } from "@tanstack/react-query";

const TopArtists = () => {
  const [activeSong, isPlaying] = usePlayerStore((state) => [state.activeSong, state.isPlaying]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["worldwideTop"],
    queryFn: fetchTopWorldwide,
    refetchOnMount: false,
  });
  if (isFetching) return <Loader title="Loading top chart songs..." />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artist</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((track, i) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};
export default TopArtists;
