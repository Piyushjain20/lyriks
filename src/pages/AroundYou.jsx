import { Error, Loader, SongCard } from "../components";
import { fetchTopCountrySongs } from "../utils/dataFetching";

import { useState, useEffect } from "react";
import usePlayerStore from "../zustand/playerStore";
import { useQuery } from "@tanstack/react-query";
// const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
const GEO_API_KEY = "at_gNhDmaR906kOHMK01sbfsjtt0QNgj";

const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSong, isPlaying] = usePlayerStore((state) => [state.activeSong, state.isPlaying]);

  useEffect(() => {
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=${GEO_API_KEY}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCountry(data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["aroundYou", `${country}`],
    queryFn: fetchTopCountrySongs,
    refetchOnMount: false,
    enabled: !!country,
  });
  if (isFetching) return <Loader title="Loading Songs around you..." />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard song={song} i={i} key={i} isPlaying={isPlaying} activeSong={activeSong} data={data.tracks} />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
