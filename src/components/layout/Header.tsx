'use client';
import React, { useState } from 'react';
import { Drawer, Menu } from 'antd';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="h-16 ">
      <div>
        {/* <MenuOutlined /> */}
      </div>
      <AppMenue />
      <Drawer
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        bodyStyle={{ backgroundColor: 'blue' }}
      >
        <AppMenue isInLine />
      </Drawer>
      {/* <h1>tesssssst</h1> */}
      {/* <img src=''/> */}
    </header>
  );
};

function AppMenue({ isInLine = false }) {
  return (
    <Menu
      style={{ height: '100%' }}
      mode={isInLine ? 'inline' : 'horizontal'}
      items={[
        {
          label: 'خانه',
          key: 'Home',
        },
        {
          label: 'محصولات',
          key: 'Products',
        },
        {
          label: 'وبلاگ',
          key: 'Blog',
        },
        {
          label: 'درباره ما',
          key: 'About',
        },
      ]}
    ></Menu>
  );
}
export default Header;
