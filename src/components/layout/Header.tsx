'use client';
import React, { useState } from 'react';
import { Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="h-16 flex w-full border-b sm:justify-center">
      <div
        style={{
          backgroundColor: 'red',
          height: '60px',
          paddingRight: 12,
          paddingTop: 12,
        }}
        className="sm:hidden"
      >
        <MenuOutlined
          dir="rtl"
          style={{ fontSize: 30 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="hidden sm:block">
        <AppMenue />
      </span>
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
