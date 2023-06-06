'use client';
import {
  DatabaseOutlined,
  HomeOutlined,
  MonitorOutlined,
  ShopOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import React from 'react';

const SideBar = () => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col">
      <h2 className="border-l mb-0 text-center p-6 py-10 font-bold text-3xl">
        داشبورد
      </h2>
      <Menu
        className="flex-1"
        // style={{ height: '100%' }}
        onClick={({ key }) => {
          if (key === '/Logout') {
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
