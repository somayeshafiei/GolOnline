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
import React from 'react';

const SideBar = () => {
  return (
    <div className="h-full">
      <Title>داشبورد</Title>
      <Menu
        items={[
          { label: 'خانه', key: '/', icon: <HomeOutlined /> },
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
