'use client';
import { Button, Table, InputNumber, Input } from 'antd';
import { useEffect, useState } from 'react';
import instance from '@/api/constants';
import axios from 'axios';

interface Props {
  products: Product[];
}

interface Product {
  _id: string;
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
  quantity: number;
}

export default function InventoryTable({ products }: Props) {
  const [editingKey, setEditingKey] = useState('');
  const [columns, setColumns] = useState([
    {
      title: 'کالا',
      dataIndex: 'name',
    },
    {
      title: 'قیمت',
      dataIndex: 'price',
      editable: true,
    },
    {
      title: 'موجودی',
      dataIndex: 'quantity',
      editable: true,
    },
    {
      title: 'عملیات',
      dataIndex: '',
      key: 'operation',
      render: (record: Product) => {
        if (!record) {
          return null;
        }
        console.log('record:', record);
        console.log('record:', record._id);

        console.log('editingKey:', editingKey);
        const isEditing = record?._id === editingKey;
        return isEditing ? (
          <span>
            <Button type="link" onClick={() => handleSave(record)}>
              ذخیره
            </Button>
            <Button type="link" onClick={() => setEditingKey('')}>
              لغو
            </Button>
          </span>
        ) : (
          <Button
            type="link"
            disabled={editingKey !== ''}
            onClick={() => {
              console.log('record?._id:', record?._id);
              setEditingKey(record?._id);
              // console.log('editingKey:', editingKey);
            }}
          >
            ویرایش
          </Button>
        );
      },
    },
  ]);
  const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/products');
  //       setDataSource(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSave = async (product: Product) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/products/${product._id}`,
        {
          price: product.price,
          quantity: product.quantity,
        }
      );

      const updatedProduct = response.data;
      const newData = [...dataSource];
      const index = newData.findIndex(
        (item) => item._id === updatedProduct._id
      );
      newData.splice(index, 1, updatedProduct);
      setDataSource(newData);
      setEditingKey('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table
        columns={columns.map((col) => ({
          ...col,
          onCell: (product: Product) => ({
            product,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        }))}
        dataSource={products}
        pagination={{
          pageSize: 3,
          total: dataSource.length,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </>
  );
}
