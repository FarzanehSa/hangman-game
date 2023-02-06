import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeXmark, faMusic, faBorderNone } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './Control.scss';

import music from '../assets/music.wav';
import useAudioPlayer from './useAudioPlayer';


const PrettoSlider = styled(Slider)({
  color: '#FFF',
  height: 24,
  // '& .MuiSlider-track': {
  //   border: 'none',
  // },
  '& .MuiSlider-thumb': {
    height: 0.5,
    width: 0.5,
    backgroundColor: '#fff',
    // border: '2px solid currentColor',
    border: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    // '&:before': {
    //   display: 'none',
    // },
  },
  // '& .MuiSlider-valueLabel': {
  //   lineHeight: 1.2,
  //   fontSize: 12,
  //   background: 'unset',
  //   padding:  0,
  //   width: 32,
  //   height: 32,
  //   borderRadius: '50% 50% 50% 0',
  //   // backgroundColor: '#52af77',
  //   transformOrigin: 'bottom left',
  //   transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
  //   '&:before': { display: 'none' },
  //   '&.MuiSlider-valueLabelOpen': {
  //     transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
  //   },
  //   // '& > *': {
  //   //   transform: 'rotate(45deg)',
  //   // },
  // },
});

const Control = ({volume, setVolume, musicVolume, setMusicVolume}) => {

  const { playing, setPlaying } = useAudioPlayer(musicVolume);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const handleMusicChange = (event, newValue) => {
    setMusicVolume(newValue / 100);
  };


  return (
    <div className="control">
     <audio id="music">
        <source src={music} />
      </audio>

      <Box sx={{ width: 200 }} className="box">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {playing ? 
          <button 
            className="btn-volume"
            onClick={() => setPlaying(false)}
          >
            <FontAwesomeIcon icon={faMusic} />
          </button>
          :
          <button
            onClick={() => setPlaying(true)}
            className="btn-volume"
          >
            <FontAwesomeIcon icon={faMusic} />
            <div className="diag-line-show"></div>
          </button>
          }
          <PrettoSlider aria-label="Volume" value={musicVolume * 100} onChange={handleMusicChange} />
        </Stack> 
      </Box>

      <Box sx={{ width: 200 }} className="box">
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          {volume ? 
          <button 
            className="btn-volume"
            onClick={() => setVolume(0)}
          >
            <FontAwesomeIcon icon={faVolumeLow}/>
          </button>
          :
          <button
          onClick={() => setVolume(0.2)} 
          className="btn-volume"
          >
            <FontAwesomeIcon icon={faVolumeLow}/>
            <div className="diag-line-show"></div>
          </button>
          }
          <PrettoSlider aria-label="Volume" value={volume * 100} onChange={handleVolumeChange} />
        </Stack> 
      </Box>
    </div>
  )
}

export default Control;