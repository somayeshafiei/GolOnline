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
export default function ProductsTable({ products }: Props) {
  // const [categories, setCategories] = useState();
  const [columns, setColumns] = useState([
    {
      title: 'تصویر',
      dataIndex: 'images[0]',
      // render:()=><img src={`https://localhost:8000/products/images/products/images/${dataIndex}`}
    },
    {
      title: 'نام محصول',
      dataIndex: 'name',
    },
    {
      title: 'دسته بندی',
      dataIndex: 'category',
      // render:(value:string)=>fetch()
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
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 500 }} />
    </>
  );
}
