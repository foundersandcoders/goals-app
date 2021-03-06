import React from 'react';
import PropTypes from 'prop-types';

import * as steps from '../steps.js';
import Menu from './../components/menu.jsx';

const Nav = ({ onNavClick, onBackButtonClick, step, menu, toggleMenu, }) => {

  const path = './images/';
  const pathBack = path + 'icons/back.svg';
  const pathLogo = path + 'logo_header.svg';
  const pathMenu = path + 'icons/menu.svg';
  const backButtonStyle = (step === steps.GOALS_LIST)
    ? { visibility: 'hidden', }
    : {};

  return (
    <div>
      <Menu menu={ menu } toggleMenu={ toggleMenu }/>
      <nav className="nav">
        <div className="nav-back-container">
          <img
            className="back"
            src={ pathBack }
            onClick = { onBackButtonClick }
            style={ backButtonStyle }
          />
        </div>
        <div className="nav-logo-container">
          <img
            src={ pathLogo }
            alt="Grow"
            title="Grow logo"
            onClick = { onNavClick }
          />
        </div>
        <div className="nav-menu-container">
          <img
            className="menu"
            src={ pathMenu }
            onClick={ toggleMenu }
          />
        </div>
      </nav>
      <Menu menu={ menu } toggleMenu={ toggleMenu }/>
    </div>
  );
};

Nav.propTypes = {
  onNavClick: PropTypes.func,
  toggleMenu: PropTypes.func,
  menu: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
  step: PropTypes.string,
};

export default Nav;
