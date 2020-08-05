import axios from 'axios';

function getHashParams() {
  let hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

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
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('followedArtists');
    window.localStorage.removeItem('playlists');
    window.localStorage.removeItem('topArtists');
    window.localStorage.removeItem('topTracks');
    window.localStorage.removeItem('randomPlaylist');
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('followedArtists');
    window.localStorage.removeItem('playlists');
    window.localStorage.removeItem('topArtists');
    window.localStorage.removeItem('topTracks');
    window.localStorage.removeItem('randomPlaylist');
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
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('followedArtists');
  window.localStorage.removeItem('playlists');
  window.localStorage.removeItem('topArtists');
  window.localStorage.removeItem('topTracks');
  window.localStorage.removeItem('randomPlaylist');
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
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    params,
  });

export const getUserTopArtistsAndTracks = (type) =>
  axios.get(`https://api.spotify.com/v1/me/top/${type}`, { headers });

export const getATrack = (trackId) =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
