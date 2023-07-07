'use client';
import instance from '@/api/constants';
import {
  DatabaseOutlined,
  HomeOutlined,
  MonitorOutlined,
  ShopOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import Cookies from 'universal-cookie';

const SideBar = () => {
  const handleLogOut = () => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    cookies.remove('userFirstName');
    cookies.remove('userLastName');
    cookies.remove('userId');
    if (accessToken) {
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
    }
  };
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <h2 className="p-6 py-10 mb-0 text-3xl font-bold text-center border-l">
        داشبورد
      </h2>
      <Menu
        className="flex-1"
        onClick={({ key }) => {
          if (key === '/Logout') {
    instance.get(`http://localhost:8000/api/auth/logout`);
            handleLogOut();
            router.push('/');
          } else {
            router.push(key);
          }
        }}
        defaultSelectedKeys={[window.location.pathname]}
        items={[
          { label: 'خانه', key: '/dashboard', icon: <HomeOutlined /> },
          {
            label: 'سفارشات',
            key: '/dashboard/orders',
            icon: <ShopOutlined />,
          },
          {
            label: 'محصولات',
            key: '/dashboard/products',
            icon: <DatabaseOutlined />,
          },
          {
            label: 'قیمت و موجودی',
            key: '/dashboard/Inventory_price',
            icon: <MonitorOutlined />,
          },
          {
            label: 'خروج',
            key: '/Logout',
            icon: <PoweroffOutlined />,
            danger: true,
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideBar;
