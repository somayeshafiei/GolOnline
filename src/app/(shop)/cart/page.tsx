'use client';
import Loading from '@/app/loading';
import Product, { CartRecord } from '@/interfaces';
import useCartStore from '@/store/store';
import React, { useEffect, useState, Suspense } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { products, removeFromCart, increaseItemCount, decreaseItemCount } =
    useCartStore();
  const cookies = new Cookies();
  const userFirstName = cookies.get('userFirstName');
  const router = useRouter();
  const handleCheckout = () => {
    userFirstName ? router.push('/checkout') : router.push('/login');
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = products.map((item) => item.product);
      const productRequests = productIds.map((id) =>
        fetch(`http://localhost:8000/api/products/${id}`)
          .then((response) => response.json())
          .then((res) => res.data.product)
      );
      const productData = await Promise.all(productRequests);
      setAllProducts(productData);
    };

    fetchProducts();
  }, [products]);

  const columns = [
    {
      title: 'تصویر',
      dataIndex: 'images',
      render: (images: string) => (
        <Image
          loading="lazy"
          height={100}
          width={100}
          alt="pic"
          src={`http://localhost:8000/images/products/images/${images}`}
        />
      ),
    },
    {
      title: 'نام محصول',
      dataIndex: 'name',
    },
    {
      title: 'قیمت',
      dataIndex: 'price',
      render: (price: number) => `${price}  تومان`,
    },
    {
      title: 'تعداد',
      dataIndex: 'count',
      render: (count: number, record: any) => (
        <div>
          <Button
            onClick={() => increaseItemCount(record.key)}
            disabled={count === record.quantity}
          >
            +
          </Button>
          {/* <input type="number" value={count} onChange={(e) => updateItemCount(record.key, parseInt(e.target.value))} /> */}
          <input type="number" value={count} className="w-8 mr-2"></input>
          <Button
            onClick={() => decreaseItemCount(record.key)}
            danger
            disabled={count === 1}
          >
            -
          </Button>
        </div>
      ),
    },
    {
      title: 'قیمت کل',
      dataIndex: 'totalPrice',
      render: (totalPrice: number) => `${totalPrice}  تومان`,
    },
    {
      title: '',
      dataIndex: 'key',
      render: (key: string) => (
        <Popconfirm
          title="این محصول از سبد خرید حذف شود؟"
          onConfirm={() => {
            removeFromCart(key);
            message.success('محصول با موفقیت از سبد خرید حذف شد');
          }}
          okText="بله"
          cancelText="خیر"
          okButtonProps={{ style: { backgroundColor: 'red' } }}
          cancelButtonProps={{
            style: { backgroundColor: 'green', color: 'white' },
          }}
        >
          <Button type="primary" danger>
            حذف
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const data = products.map((item) => {
    const product = allProducts.find((p) => p._id === item.product);
    return {
      key: item.product,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      count: item.count,
      totalPrice: product?.price && item.count * product?.price,
      images: product?.images[0],
      quantity: product?.quantity,
    };
  });

  return (
    <>
      <h1 className="font-bold text-2xl px-5 sm:px-10 md:px-[120px] py-8">
        سبد خرید شما:
      </h1>
      <Suspense fallback={<Loading />}>
        <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
          <Table
            locale={{
              emptyText: 'سبد خرید خالی است',
            }}
            columns={columns}
            dataSource={data}
            footer={() => {
              const totalPrice = data.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.totalPrice,
                0
              );
              return (
                <div className="w-full flex px-5 justify-between items-center">
                  <div className="flex gap-3 text-center pr-20">
                    <span className="text-lg font-semibold">جمع نهایی:</span>
                    <div className="flex gap-3">
                      <span className="text-lg font-semibold underline">
                        {totalPrice}
                      </span>
                      <span className="text-lg font-semibold">تومان</span>
                    </div>
                  </div>
                  <Button className="bg-green-200" onClick={handleCheckout}>
                    نهایی کردن سبد خرید
                  </Button>
                </div>
              );
            }}
          />
        </div>
      </Suspense>
    </>
  );
};

export default Cart;
