'use client';
import Product from '@/interfaces';
import useCartStore from '@/store/store';
import { Button, Rate, message } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
interface Props {
  productDetail: Product;
}
function ProductDetail({ productDetail }: Props) {
  const [cartItems, addToCart, increaseItemCount, decreaseItemCount] =
    useCartStore((state) => [
      state.cartItems,
      state.addToCart,
      state.increaseItemCount,
      state.decreaseItemCount,
    ]);
  const getProductCount = (productId: string) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.count : 0;
  };
  const itemCount = getProductCount(productDetail._id);
  return (
    <div>
      <div className="w-full flex gap-5">
        <div className="w-[50%] relative h-96">
          <Image
            fill
            src={`http://localhost:8000/images/products/images/${productDetail.images[0]}`}
            alt={`${productDetail.images[0]}`}
          ></Image>
        </div>
        <div className="w-[50%] ">
          <h1 className="font-bold text-2xl pb-3">{productDetail.name}</h1>
          <div className="flex w-full items-center justify-between border-b border-b-green-300 pb-2">
            <div className="flex gap-1 font-bold text-[#46A358]">
              <span>{productDetail.price}</span>
              <span>تومان</span>
            </div>
            <div>
              <Rate disabled defaultValue={productDetail.rating.rate} />
            </div>
          </div>
          <div className="flex py-4 w-[20%]">
            <Button
              onClick={() => decreaseItemCount(productDetail._id)}
              disabled={itemCount === 0}
            >
              -
            </Button>
            <input type="number" className=" px-2 w-12" value={itemCount} />
            <Button
              onClick={() => increaseItemCount(productDetail._id)}
              disabled={itemCount === productDetail.quantity}
            >
              +
            </Button>
          </div>
          <Button
            onClick={() =>{ 
              addToCart(productDetail._id);
              message.success('محصول با موفقیت به سبد خرید اضافه شد')
            }}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
