const SHAZAM_API_KEY = import.meta.env.VITE_SHAZAM_RAPID_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${SHAZAM_API_KEY}`,
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
const BASE_URL = "https://shazam.p.rapidapi.com/";
const LOCALE_LOCATION = "en-US";

export const fetchSongsByGenre = async ({ queryKey }) => {
  const genreListId = queryKey[0];
  const response = await fetch(`${BASE_URL}charts/track?listId=${genreListId}&pageSize=20&startFrom=0`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export const fetchSearchResult = async ({ queryKey }) => {
  const searchTerm = queryKey[1];
  const response = await fetch(`${BASE_URL}search?term==${searchTerm}`, options);
  console.log(`${BASE_URL}search?term==${searchTerm}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchTopWorldwide = async () => {
  const response = await fetch(`${BASE_URL}charts/track?listId=genre-global-chart-12&pageSize=20&startFrom=0`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchTopCountrySongs = async ({ queryKey }) => {
  const counrtyCode = queryKey[1];
  const response = await fetch(`${BASE_URL}charts/track?listId=ip-country-chart-${counrtyCode}&pageSize=20&startFrom=0`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchSongDetails = async ({ queryKey }) => {
  const songid = queryKey[1];
  const response = await fetch(`${BASE_URL}songs/get-details?key=${songid}&locale=en-US`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchRecomendedSongs = async ({ queryKey }) => {
  const songid = queryKey[1];
  const response = await fetch(`${BASE_URL}songs/list-recommendations?key=${songid}&locale=en-US`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchRelatedSongs = async ({ queryKey }) => {
  const adamid = queryKey[1];
  const response = await fetch(`${BASE_URL}artists/get-top-songs?id=${adamid}&l=en-US`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchArtistDetails = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await fetch(`${BASE_URL}artists/get-details?id=${id}&l=en-US`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
