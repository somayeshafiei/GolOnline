'use client';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Drawer, Menu } from 'antd';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../images/test.png';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import useCartStore from '@/store/store';
import instance from '@/api/constants';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const refreshToken = cookies.get('refreshToken');

  const userFirstname = cookies.get('userFirstName');
  const [cartItems] = useCartStore((state) => [state.products.length]);
  const handleLogOut = () => {
    instance.get(`http://localhost:8000/api/auth/logout`);
    const cookies = new Cookies();
    cookies.remove('userFirstName', {path: "/", domain: "localhost"});
    cookies.remove('userLastName');
    cookies.remove('userId');
    if (accessToken) {
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
    }
  };
  // useEffect(()=>{
  //   console.log('ttttttt')
  // },[accessToken,cartItems])
  return (
    <header className="py-2 flex w-full border-b justify-between px-5 sm:px-10 md:px-[120px]">
      <span className="hidden sm:flex sm:flex-col sm:justify-center sm:items-center sm:justify-items-end">
        <Link href={'/'}>
          <Image src={logo} alt="logo" height={20} width={120} />
        </Link>
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
      <span className="hidden sm:block sm:w-[20rem] h-full pb-2">
        <AppMenue />
      </span>
      <Drawer
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        bodyStyle={{ backgroundColor: '#AF6EA0', width: '150px' }}
        contentWrapperStyle={{ width: '150px' }}
      >
        <AppMenue isInLine />
      </Drawer>
      <div className="flex items-center justify-center gap-4">
        {accessToken && (
          <Link href={'/dashboard/orders'}>
            <UserOutlined style={{ fontSize: 24 }} />
          </Link>
        )}
        <Link href={'/cart'}>
          <Badge
            count={cartItems}
            size="default"
            status="processing"
            color="red"
          >
            {/* <Avatar shape="square" size="large" /> */}
            <ShoppingCartOutlined style={{ fontSize: 24 }} />
          </Badge>
        </Link>
        {userFirstname ? (
          <Button
            className="text-white bg-[#666b67] hover:bg-white hover:text-[#46A358] hover:border hover:border-[#46A358]"
            onClick={handleLogOut}
          >
            خروج <LogoutOutlined />
          </Button>
        ) : (
          <Link href={'/login'}>
            <Button className="text-white bg-[#AF6EA0] hover:bg-white hover:text-[#46A358] hover:border hover:border-[#46A358] ">
              ورود <LoginOutlined />
            </Button>
          </Link>
        )}
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
