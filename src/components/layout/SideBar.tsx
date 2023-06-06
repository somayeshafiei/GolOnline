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
    <div className="h-full">
      <Title>داشبورد</Title>
      <Menu
        onClick={({ key }) => {
          if (key === '/Logout') {
            router.push('/');
          } else {
            router.push(key);
          }
        }}
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
