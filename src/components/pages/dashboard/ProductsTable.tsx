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
import Image from 'next/image';
import { useState } from 'react';
export default function ProductsTable({ products }: Props) {
  const [columns, setColumns] = useState([
    {
      title: 'تصویر',
      dataIndex: '',
      key: 'images',
      render: (record) => (
        <Image
          height={100}
          width={100}
          alt="pic"
          src={`https://localhost:8000/products/images/products/images/${record.images[0]}`}
        />
      ),
    },
    {
      title: 'نام محصول',
      dataIndex: 'name',
    },
    {
      title: 'دسته بندی',
      dataIndex: '',
      key: 'category-subcategory',
      render: (record) => (
        <span>
          {record.category.name} / {record.subcategory.name}
        </span>
      ),
    },
    {
      title: 'عملیات',
      dataIndex: 'actions',
      render: () => (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <Button type="primary">ویرایش</Button>
          <Button>حذف</Button>
        </div>
      ),
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
          pageSize: 4,
          total: products.length,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
}
