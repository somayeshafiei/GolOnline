'use client';
import Product from '@/interfaces';
import useCartStore from '@/store/store';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Rate, message } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import App from './Slider';
import ThumbnailSlider from './Slider';

interface Props {
  productDetail: Product;
}
function ProductDetail({ productDetail }: Props) {
  const [products, addToCart, increaseItemCount, decreaseItemCount] =
    useCartStore((state) => [
      state.products,
      state.addToCart,
      state.increaseItemCount,
      state.decreaseItemCount,
    ]);
  const getProductCount = (productId: string) => {
    const item = products.find((item) => item.product === productId);
    return item ? item.count : 0;
  };
  const itemCount = getProductCount(productDetail._id);
  return (
    <div>
      <div className="w-full flex gap-5">
        <div className="w-[50%] relative h-96">
          {/* <ThumbnailSlider images={productDetail.images} /> */}
          <Image
            fill
            src={`http://localhost:8000/images/products/images/${productDetail.images[0]}`}
            alt={`${productDetail.images[0]}`}
          ></Image>
        </div>
        <div className="w-[50%] ">
          <h1 className="font-bold text-2xl pb-3">{productDetail.name}</h1>
          <div className="flex w-full items-center justify-between border-b border-b-green-300 pb-2">
            <div className="flex gap-1 font-bold text-['#46A358'] text-md">
              <span>{productDetail.price}</span>
              <span>تومان</span>
            </div>
            <div>
              <Rate disabled defaultValue={productDetail.rating.rate} />
            </div>
          </div>
          <div className="flex py-4 w-[20%]">
            {itemCount !== 1 ? (
              <Button
                onClick={() => decreaseItemCount(productDetail._id)}
                danger
                // disabled={itemCount === 0}
              >
                -
              </Button>
            ) : (
              <Button
                onClick={() => {
                  decreaseItemCount(productDetail._id);
                  message.warning(
                    'محصول مورد نظر با موفقیت از سبد خرید حذف شد'
                  );
                }}
                danger
              >
                <DeleteOutlined style={{ color: 'red', fontSize: '24' }} />
              </Button>
            )}

            <input type="number" className=" px-2 w-12" value={itemCount} />
            {itemCount === 0 ? (
              <Button
                onClick={() => {
                  itemCount < productDetail.quantity
                    ? (addToCart(productDetail._id),
                      message.success('محصول با موفقیت به سبد خرید اضافه شد'))
                    : message.error('محصول موجود نیست');
                }}
              >
                +
              </Button>
            ) : (
              <Button
                onClick={() => {
                  increaseItemCount(productDetail._id);
                  message.info('تعداد محصول مورد نظر در سبد خرید اضافه شد');
                }}
                disabled={itemCount === productDetail.quantity}
              >
                +
              </Button>
            )}
          </div>
          {itemCount < productDetail.quantity ? (
            <Button
              onClick={() => {
                itemCount === 0
                  ? (addToCart(productDetail._id),
                    message.success('محصول با موفقیت به سبد خرید اضافه شد'))
                  : (addToCart(productDetail._id),
                    message.info('تعداد محصول مورد نظر در سبد خرید اضافه شد'));
              }}
            >
              افزودن به سبد خرید
            </Button>
          ) : (
            <Button disabled onClick={() => message.error('محصول موجود نیست')}>
              افزودن به سبد خرید
            </Button>
          )}
        </div>
      </div>
      <h2 className="my-3">توضیحات محصول</h2>
      <div dangerouslySetInnerHTML={{ __html: productDetail.description }} />
    </div>
  );
}

export default ProductDetail;
