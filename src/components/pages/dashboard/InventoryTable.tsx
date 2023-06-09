'use client';
interface Props {
  products: Prduct[];
}
interface Prduct {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };

  createdAt: string;

  updatedAt: string;

  slugname: string;

  __v: number;
}
import { Button, Table } from 'antd';
import { useState } from 'react';
export default function InventoryTable({ products }: Props) {
  const [columns, setColumns] = useState([
    {
      title: 'کالا',
      dataIndex: 'name',
    },
    {
      title: 'قیمت',
      dataIndex: 'price',
    },
    {
      title: 'موجودی',
      dataIndex: 'quantity',
    },
  ]);
  const [dataSource, setDataSource] = useState(
    products && Array.isArray(products) ? products : []
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
          total: products.length,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
}
