'use client';
import { Order } from '@/interfaces';
import { Button, Table } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ChangeDeliveryStatusTable({ order }: any) {
  console.log(order.products.map((pro) => console.log(pro)));
  const [columns, setColumns] = useState([
    {
      title: 'کالا ',
      dataIndex: '',
      key: 'name',
      render: (record: any) => (
        <Button type="link">
          <Link href={`/products/${record.product?._id}`}>
            {record.product?.name}
          </Link>
        </Button>
      ),
    },
    {
      title: ' قیمت',
      dataIndex: '',
      key: 'price',
      render: (record: any) => <span>{record.product?.price}</span>,
    },
    {
      title: 'تعداد',
      dataIndex: '',
      key: 'count',
      render: (record: any) => <span>{record.count}</span>,
    },
  ]);
  const [dataSource, setDataSource] = useState(order ? order?.products : []);
  useEffect(() => {
    setDataSource(order ? order.products : []);
  }, [order]);
  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
}
