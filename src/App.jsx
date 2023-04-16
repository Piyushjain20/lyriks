import { Route, Routes } from "react-router-dom";
import usePlayerStore from "./zustand/playerStore";
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from "./pages";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  const [activeSong, resetPlayerStore] = usePlayerStore((state) => [state.activeSong, state.resetPlayerStore]);

  const PlayBackError = () => {
    return (
      <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#434343] backdrop-blur-lg rounded-t-3xl z-10">
        <div className="w-full flex justify-center items-center">
          <h1 className="font-bold text-2xl text-white mt-2">Something went wrong. Please try again.</h1>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#434343]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route end path="/" element={<Discover />} />
              <Route end path="/top-artists" element={<TopArtists />} />
              <Route end path="/top-charts" element={<TopCharts />} />
              <Route end path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
      <ErrorBoundary
        FallbackComponent={PlayBackError}
        onError={(details) => {
          console.log(details);
          resetPlayerStore();
        }}>
        {activeSong?.title && (
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#434343]/50 backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
