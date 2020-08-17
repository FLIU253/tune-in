import { useContext } from 'react';
import { AudioPlayerContext } from '../context/AudioPlayerContext';

const useAudioPlayer = () => {
  const [audioState, setAudioState] = useContext(AudioPlayerContext);

  const setTracks = (tracks) => {
    setAudioState((audioState) => ({
      ...audioState,
      tracks,
      isLoaded: true,
    }));
  };

  const resetTracksValues = () => {
    setAudioState((audioState) => ({
      ...audioState,
      tracks: [],
      currentTrackIndex: null,
      isPlaying: false,
      audioPlayer: new Audio(),
      isLoaded: false,
      noFile: false,
      volume: 0.5,
    }));
  };

  //Play a specific track
  const playTrack = (index) => {
    if (index === audioState.currentTrackIndex) {
      togglePlay();
    } else {
      audioState.audioPlayer.pause();
      audioState.audioPlayer = new Audio(audioState.tracks[index].preview_url);
      audioState.audioPlayer.muted = true;
      audioState.audioPlayer.volume = audioState.volume;
      console.log(audioState.audioPlayer.volume);
      audioState.audioPlayer
        .play()
        .then(() => {
          audioState.audioPlayer.muted = false;
          setAudioState((audioState) => ({
            ...audioState,
            currentTrackIndex: index,
            isPlaying: true,
            noFile: false,
          }));
        })
        .catch((err) => {
          setAudioState((audioState) => ({
            ...audioState,
            currentTrackIndex: index,
            isPlaying: false,
            noFile: true,
          }));
        });
    }
  };

  //toggle play or pause
  const togglePlay = () => {
    if (audioState.isPlaying) {
      audioState.audioPlayer.pause();
    } else {
      audioState.audioPlayer.play();
    }
    setAudioState((audioState) => ({
      ...audioState,
      isPlaying: !audioState.isPlaying,
    }));
  };

  const adjustVolume = (value) => {
    if (audioState.audioPlayer) {
      audioState.audioPlayer.volume = value;
      setAudioState((audioState) => ({
        ...audioState,
        volume: value,
      }));
    }
  };

  //Play the previous track in the tracks array
  const playPreviousTrack = () => {
    const newIndex =
      (((audioState.currentTrackIndex + -1) % audioState.tracks.length) +
        audioState.tracks.length) %
      audioState.tracks.length;
    playTrack(newIndex);
  };

  //Play the next track in the tracks array
  const playNextTrack = () => {
    const newIndex =
      (audioState.currentTrackIndex + 1) % audioState.tracks.length;
    playTrack(newIndex);
  };

  return {
    playTrack,
    togglePlay,
    currentTrackName:
      audioState.currentTrackIndex !== null &&
      audioState.tracks[audioState.currentTrackIndex] &&
      audioState.tracks[audioState.currentTrackIndex].name,
    trackList: audioState.tracks,
    isPlaying: audioState.isPlaying,
    playPreviousTrack,
    playNextTrack,
    isLoaded: audioState.isLoaded,
    index: audioState.currentTrackIndex,
    adjustVolume,
    noFile: audioState.noFile,
    setTracks,
    resetTracksValues,
  };
};

export default useAudioPlayer;
