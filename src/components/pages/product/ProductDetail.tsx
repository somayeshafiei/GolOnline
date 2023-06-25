'use client';
import Product from '@/interfaces';
import { Button, Rate } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
interface Props {
  productDetail: Product;
}
function ProductDetail({ productDetail }: Props) {
  const [count, setCount] = useState(0);

  function incrementCount() {
    if (count < productDetail.quantity) {
      setCount(count + 1);
    }
  }

  function decrementCount() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  console.log(productDetail)
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
            <Button onClick={decrementCount}>-</Button>
            <input type="number" className=" px-2 w-12" value={count} />
            <Button onClick={incrementCount}>+</Button>
          </div>
          <Button>افزودن به سبد خرید</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
