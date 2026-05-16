import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import data from './links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../Logo';
import { useLocation } from 'react-router-dom';

const LinkWithIcon = ({ name, icon, link, currentPath }) => {
  const cssClass = `side-nav-link${currentPath === link ? ' active' : ''}`;
  return (
    <div className={cssClass}>
      <FontAwesomeIcon icon={icon} />
      <Link to={link}>{name}</Link>
    </div>
  );
};

const SideNav = () => {
  const location = useLocation();

  const links = data.map((i) => (
    <LinkWithIcon
      name={i.name}
      icon={i.icon}
      link={i.link}
      currentPath={location.pathname}
    />
  ));

  return (
    <nav className="side-nav">
      <Logo size="2x" />
      {links}
    </nav>
  );
};

export default SideNav;
