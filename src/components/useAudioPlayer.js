import { useState, useEffect } from "react";

function useAudioPlayer(vol) {
  // const [duration, setDuration] = useState();
  // const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  // const [mV, setMV] = useState(0.5);
  // const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("music");

    // state setters wrappers
    // const setAudioData = () => {
    //   setDuration(audio.duration);
    //   setCurTime(audio.currentTime);
    // }

    // const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    // audio.addEventListener("loadeddata", setAudioData);

    // audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();
    audio.volume = vol;
    audio.loop = true;
    

    // if (clickedTime && clickedTime !== curTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // } 

    // effect cleanup
    return () => {
      // audio.removeEventListener("loadeddata", setAudioData);
      // audio.removeEventListener("timeupdate", setAudioTime);
    }
  });

  return {
    // curTime,
    // duration,
    playing,
    setPlaying,
    // setClickedTime
  }
}

export default useAudioPlayer;