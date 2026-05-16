import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

/**
 * The Match logo, with icon and text.
 */
const Logo = ({ size = '5x' }) => {
  return (
    <div className="app-logo no-select">
      <span>
        <FontAwesomeIcon icon={faHeart} size={size} color="#ff0009" />
      </span>
      <h1>Fit Match</h1>
    </div>
  );
};

export default Logo;
