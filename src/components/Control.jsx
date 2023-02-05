import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeXmark, faMusic } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import './Control.scss';

import music from '../assets/music.wav';

const Control = ({volume, setVolume}) => {

  const handleChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const onMusic = () => {
    const sMusic = new Audio(music);
    sMusic.volume = volume;
    sMusic.play();
  }

  return (
    <div className="control">

      <button className='music' onClick={onMusic}><FontAwesomeIcon icon={faMusic} /></button>

      {volume ? 
      <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <button onClick={() => setVolume(0)}><FontAwesomeIcon icon={faVolumeLow}/></button>
          <Slider aria-label="Volume" value={volume * 100} onChange={handleChange} />
        </Stack> 
      </Box>
        :
        <button onClick={() => setVolume(0.2)}><FontAwesomeIcon icon={faVolumeXmark}/></button>
      }


    </div>
  )
}

export default Control;