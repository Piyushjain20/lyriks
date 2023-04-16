import { useParams } from "react-router-dom";
import usePlayerStore from "../zustand/playerStore";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistDetails, fetchRelatedSongs } from "../utils/dataFetching";

const ArtistDetails = () => {
  // React router param hook to read dynamic routes
  const { id: artistId } = useParams();

  // Zustand store slice
  const [activeSong, isPlaying] = usePlayerStore((state) => [state.activeSong, state.isPlaying]);

  //   Fetching Logic using tanstack query
  const {
    data: artistData,
    isFetching: isFetchingArtistData,
    error: errorInArtistData,
  } = useQuery({
    queryKey: [`artistData`, `${artistId}`],
    queryFn: fetchArtistDetails,
    refetchOnMount: false,
  });

  const {
    data: relatedSongData,
    isFetching: isFetchingRelatedSongs,
    error: errorInRelatedSongs,
  } = useQuery({
    queryKey: ["relatedSongs", `${artistId}`],
    queryFn: fetchRelatedSongs,
    refetchOnMount: false,
  });

  if (isFetchingArtistData || isFetchingRelatedSongs) return <Loader title="Loading artist details" />;
  if (errorInArtistData || errorInRelatedSongs) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs data={relatedSongData.data} isPlaying={isPlaying} activeSong={activeSong} artistId={artistId} title="Related Songs" />
    </div>
  );
};

export default ArtistDetails;
