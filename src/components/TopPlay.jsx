import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTopWorldwide } from "../utils/dataFetching";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import PlayPause from "./PlayPause";
import usePlayerStore from "../zustand/playerStore";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#434343] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-ase text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
  </div>
);

const TopPlay = () => {
  const [playPause, setActiveSong, activeSong, isPlaying] = usePlayerStore((state) => [state.playPause, state.setActiveSong, state.activeSong, state.isPlaying]);
  const { data } = useQuery({
    queryKey: ["worldwideTop"],
    queryFn: fetchTopWorldwide,
    refetchOnMount: false,
  });
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  const topPlays = data?.tracks.slice(0, 5);
  const handlePlayClick = (song, i) => {
    setActiveSong({ song, data, i });
    playPause(true);
  };
  const handlePauseClick = () => {
    playPause(false);
  };
  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} key={song.key} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song, i)} />
          ))}
        </div>
      </div>

      {/* TOP Artist Section */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]} className="mt-4">
          {topPlays?.map((song, i) => {
            return (
              <SwiperSlide key={song?.key} style={{ width: "25%", height: "auto" }} className="shadow-lg rounded-full animate-slideright">
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export default TopPlay;
