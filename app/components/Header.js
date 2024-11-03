// Header.js (Adjusted to use a unique z-index)
import React from 'react';
import Menu from './Menu';

const Header = ({ onSelect = () => {}, activeSection }) => {
  return (
    <header className="fixed top-0 w-full z-50 ">
      <Menu onSelect={onSelect} activeSection={activeSection} />
    </header>
  );
};

export default Header;
