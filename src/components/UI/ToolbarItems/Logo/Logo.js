import React from 'react';

import LogoImage from "../../../../assets/logo.png";
import './Logo.css';

const logo = ({ height }) => (
  <div className="Logo" style={{ height }}>
    <img src={LogoImage} alt="Logo" />
  </div>
);

export default logo;