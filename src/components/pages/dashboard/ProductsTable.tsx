'use client';
import DeleteProduct from '@/actions';
import Product, { Category } from '@/interfaces';
import { Button, Table, Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import EditProductForm from './EditProductForm';
interface Props {
  products: Product[];
  categories:Category[]
}
export default function ProductsTable({ products,categories }: Props) {
  const [columns, setColumns] = useState([
    {
      title: 'تصویر',
      dataIndex: '',
      key: 'images',
      render: (record: Product) => (
        <Image
          loading="lazy"
          height={100}
          width={100}
          alt="pic"
          src={`http://localhost:8000/images/products/images/${record.images[0]}`}
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
      render: (record: Product) => (
        <span>
          {record.category.name} / {record.subcategory.name}
        </span>
      ),
      sorter: (record1: Product, record2: Product) => {
        return record1.category.name.localeCompare(record2.category.name);
      },
    },
    {
      title: 'عملیات',
      dataIndex: '',
      key: '_id',
      render: (record: Product) => (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <EditProductForm record={record} categories={categories}/>
          <form
            action={() => {
              const cookies = new Cookies();
              const accessToken = cookies.get('accessToken');
              onDeleteProduct(record._id, accessToken);
            }}
          >
            <Button htmlType="submit">حذف</Button>
          </form>
        </div>
      ),
    },
  ]);
  // delete product from database with opening madal and confirm it
  function onDeleteProduct(record: string, accessToken: string) {
    Modal.confirm({
      title: 'از حذف این محصول اطمینان دارید؟',
      okText: 'بله',
      okType: 'danger',
      cancelText: 'خیر',
      onOk: () => DeleteProduct(record, accessToken),
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
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
