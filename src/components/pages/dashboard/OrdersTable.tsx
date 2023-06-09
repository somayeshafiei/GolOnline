'use client';
interface Props {
  orders: Order[];
}
interface Order {
  _id: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    phoneNumber: number;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  products: [
    {
      product: string;
      count: number;
      _id: string;
    }
  ];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

import { Button, Table } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
export default function OrdersTable({ orders }: Props) {
  const [columns, setColumns] = useState([
    {
      title: 'نام کاربر',
      dataIndex: '',
      key: 'user',
      render: (record: Order) => <span>{record.user.username}</span>,
    },
    {
      title: 'مجموع مبلغ',
      dataIndex: 'totalPrice',
    },
    {
      title: ' زمان ثبت سفارش',
      dataIndex: 'createdAt',
    },
    {
      title: 'وضعیت تحویل',
      dataIndex: '',
      key: 'deliveryStatus',
      render: (record: Order) =>
        record.deliveryStatus ? (
          <span>تحویل داده شده</span>
        ) : (
          <span>در انتظار ارسال</span>
        ),
      filters: [
        { text: 'تحویل داده شده', value: true },
        { text: 'در انتظار ارسال', value: false },
      ],
      onFilter: (value: any, record: Order) => {
        return record.deliveryStatus === value;
      },
    },
    {
      title: 'عملیات',
      dataIndex: 'actions',
      render: () => (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <Button>بررسی سفارش</Button>
        </div>
      ),
    },
  ]);
  const [dataSource, setDataSource] = useState(
    orders && Array.isArray(orders) ? orders : []
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
          total: orders.length,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
}
