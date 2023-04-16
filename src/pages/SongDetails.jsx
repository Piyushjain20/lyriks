import { useParams } from "react-router-dom";
import usePlayerStore from "../zustand/playerStore";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchSongDetails, fetchRelatedSongs, fetchRecomendedSongs } from "../utils/dataFetching";

const SongDetails = () => {
  // React router param hook to read dynamic routes
  const { songid } = useParams();

  // Zustand store slice
  const [activeSong, isPlaying] = usePlayerStore((state) => [state.activeSong, state.isPlaying]);

  //   Fetching Logic using tanstack query
  const {
    data: songData,
    isFetching: isFetchingSongData,
    error: errorInSongDetails,
  } = useQuery({
    queryKey: [`songDetails`, `${songid}`],
    queryFn: fetchSongDetails,
    refetchOnMount: false,
  });
  const {
    data: recomendedSongData,
    isFetching: isFetchingRecomendedSongs,
    error: errorInRecomendedSongs,
  } = useQuery({
    queryKey: [`recomendedSongs`, `${songid}`],
    queryFn: fetchRecomendedSongs,
    refetchOnMount: false,
  });

  const {
    data: relatedSongData,
    isFetching: isFetchingRelatedSongs,
    error: errorInRelatedSongs,
  } = useQuery({
    queryKey: ["relatedSongs", `${songData?.artists[0].adamid}`],
    queryFn: fetchRelatedSongs,
    refetchOnMount: false,
    enabled: !!(songData && recomendedSongData && Object.keys(recomendedSongData).length == 0),
  });

  if (isFetchingSongData || isFetchingRelatedSongs) return <Loader title="Searching song details" />;
  if (errorInRelatedSongs || errorInSongDetails) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
        <div className="mt-5">
          {songData?.sections[1].type == "LYRICS" ? (
            songData?.sections[1].text.map((line, index) => (
              <p className="text-base my-1 text-gray-400" key={index}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-base my-1 text-gray-400">Sorry, Lyrics Not Found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={relatedSongData ? relatedSongData?.data : recomendedSongData?.tracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={relatedSongData ? songData.artists[0].adamid : null}
        title={relatedSongData ? "Related Songs" : "Recommended Songs"}
      />
    </div>
  );
};

export default SongDetails;
