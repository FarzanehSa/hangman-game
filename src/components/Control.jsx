import { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faMusic, faQuestion } from '@fortawesome/free-solid-svg-icons';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import GeneralContext from "../contexts/GeneralContext";
import './Control.scss';

import music1 from '../assets/music1.mp3';
import music2 from '../assets/music2.ogg';

const PrettoSlider = styled(Slider)({
  color: '#FFF',
  height: 24,
  '& .MuiSlider-thumb': {
    height: 0.5,
    width: 0.5,
    backgroundColor: '#fff',
    border: 'none',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
  },
});

const Control = () => {

  const {volume, setVolume, musicVolume, setMusicVolume, setMute, mute} = useContext(GeneralContext);
  const [playing, setPlaying] = useState();
  const [openHelp, setOpenHelp] = useState(false);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
  };

  const handleMusicChange = (event, newValue) => {
    setMusicVolume(newValue / 100);
  };

  const closeModal = () => {
    setOpenHelp(false);
  }

  const audio = document.getElementById("music");
  useEffect(() => {
    if (audio) {
      if (playing && audio.pause) {
        audio.play();
      } else {
        audio.pause();
      }
      audio.loop = true;
    }
  }, [playing, audio]);

  useEffect(() => {
    if (audio) {
        audio.volume = musicVolume;
    }
  }, [musicVolume, audio]);
  
  return (
    <div className="control">
      <Modal
        isOpen={openHelp}
        onRequestClose={closeModal}
        appElement={document.getElementById('root')}
        className="a-modal"
      >
        <div className='help'>
          <span>Try to get the secret word one letter at a time!</span>
          <span>Keep in mind you will lose if you have more than 5 wrong guesses.</span>
        </div>
      </Modal>
      <audio id="music">
        <source src={music1} type="audio/mpeg"/>
        <source src={music2} type="audio/ogg"/>
      </audio>

      <div className="box">
        {playing ? 
        <button className="btn-volume" onClick={() => setPlaying(false)}>
          <FontAwesomeIcon icon={faMusic} />
        </button>
        :
        <button className="btn-volume" onClick={() => setPlaying(true)}>
          <FontAwesomeIcon icon={faMusic} />
          <div className="diag-line-show"></div>
        </button>
        }
        <Stack spacing={2} direction="row" sx={{ mb: 0 }} alignItems="center" className='bar'>
          <PrettoSlider aria-label="Volume" value={musicVolume * 100} onChange={handleMusicChange} />
        </Stack> 
      </div>

      <div className="box">
        {!mute ? 
        <button className="btn-volume" onClick={() => setMute(true)}>
          <FontAwesomeIcon icon={faVolumeLow}/>
        </button>
        :
        <button className="btn-volume" onClick={() => setMute(false)}>
          <FontAwesomeIcon icon={faVolumeLow}/>
          <div className="diag-line-show"></div>
        </button>
        }
        <Stack spacing={2} direction="row" sx={{ mb: 0 }} alignItems="center" className='bar'>
          <PrettoSlider aria-label="Volume" value={volume * 100} onChange={handleVolumeChange} />
        </Stack> 
      </div>
      <div className='box'>
        <button className='help-btn' onClick={() => {setOpenHelp(true)}}><FontAwesomeIcon icon={faQuestion} /></button>
      </div>
    </div>
  )
}

export default Control;