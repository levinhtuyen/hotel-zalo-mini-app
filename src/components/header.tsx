import React, { useEffect } from 'react';
import { Title, Button, Icon, zmp, Box, Navbar } from 'zmp-framework/react';

export const Header = ({ title, back }) => {
  if (!title) return null;

  const titleContent = title;

  return (
    <Navbar backLink={back} className='h-11' slot='fixed' noHairline noShadow>
      <Title
        size='normal'
        className='font-extrabold text-blue-dark my-0 overflow-ellipsis pr-28 overflow-hidden whitespace-nowrap'
      >
        {titleContent}
      </Title>
    </Navbar>
  );
};

Header.displayName = 'zmp-navbar';
export default Header;
