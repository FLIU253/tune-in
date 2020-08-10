import axios from 'axios';

// Get the query params off the window's URL
const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () =>
  window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () =>
  window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.reload();
};

// API CALLS ***************************************************************************************

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};
/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () =>
  axios.get('https://api.spotify.com/v1/me', { headers });

export const checkUsersSavedTracks = () =>
  axios.get(`https://api.spotify.com/v1/me/tracks/contains`, { headers });

export const getUsersSavedTracks = () =>
  axios.get(`https://api.spotify.com/v1/me/tracks`, { headers });

export const getRecommended = (params) =>
  axios.get(`https://api.spotify.com/v1/recommendations`, {
    headers,
    params,
  });

export const getUserTopArtistsAndTracks = (type) =>
  axios.get(`https://api.spotify.com/v1/me/top/${type}`, { headers });

export const getATrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

export const getAvailableGenres = () =>
  axios.get(
    `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
    { headers }
  );
