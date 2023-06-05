'use client';
import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../images/Logo.png';
import Link from 'next/link';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="h-16 flex w-full border-b justify-between px-5 sm:px-10 md:px-[120px]">
      <span className="hidden sm:flex sm:flex-col sm:justify-center sm:items-center  sm:justify-items-end">
        <Image src={logo} alt="logo" height={60} width={120} />
      </span>
      <div className="order-first flex flex-col justify-center text-[#46A358] h-full sm:hidden">
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
        bodyStyle={{ backgroundColor: 'blue', width: '190px' }}
        contentWrapperStyle={{ width: '190px' }}
      >
        <AppMenue isInLine />
      </Drawer>
      <div className="flex justify-center items-center gap-4">
        <Link href={'/cart'}>
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
        </Link>
        <Link href={'/login'}>
          <Button className="text-white bg-[#46A358] hover:bg-white hover:text-[#46A358] hover:border hover:border-[#46A358]">
            ورود
          </Button>
        </Link>
      </div>
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
