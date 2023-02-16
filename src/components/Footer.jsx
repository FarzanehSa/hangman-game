import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopyright, faLinkedin, faGithub } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


import './Footer.scss';

const Footer = () => {
  
  return (
    <div className="footer">
      <div>
        <span>
          <FontAwesomeIcon icon={faCopyright} /> 2023, Made by 
          <a href="https://www.farzanehsadegh.com/" target="_blank" rel="noopener noreferrer"> FarzanehS, </a>
          <a href="https://www.linkedin.com/in/farzanehsadegh/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          &nbsp;
          <a href="https://github.com/FarzanehSa/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className='h-icon'/>
          </a>
        </span>
      </div>
    </div>
  )

  
}

export default Footer;