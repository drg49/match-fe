import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const closeIcon = <FontAwesomeIcon icon={faClose} size='sm' color='white' />;

/**
 * A component that displays a panel with a header, title, and content.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to display inside the panel.
 * @param {string} props.id - The ID of the panel.
 * @param {string} props.size - The size of the panel ('sm', 'md', 'lg').
 * @param {string} props.title - The title of the panel.
 * @param {boolean} props.closable - Whether the panel can be closed by the user.
 * @param {boolean} props.fixedHeight - Whether the panel has a fixed height.
 */
const Panel = ({ children, id, size, title, closable, fixedHeight }) => {

  return (
    <div id={id} className={`table-top-panel ${size} ${fixedHeight && 'fixed-height'}`}>
      <header>
        <h2>{title}</h2>
        {closable && <button className='close-btn'>{closeIcon}</button>}
      </header>
      <div className='table-top-panel-content table-top-scroll'>
        {children}
      </div>
    </div>
  )
}

export default Panel;
