import Product from '@/interfaces';
import React from 'react';
import Image from 'next/image';
import { HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex flex-col w-60  gap-3 rounded-3xl border shadow">
        <div className="relative w-full h-64 rounded-t-3xl">
          <Image
            fill
            src={`http://localhost:8000/images/products/images/${product.images[0]}`}
            alt={`${product.images[0]}`}
            className="rounded-t-3xl"
          />
        </div>
        <div className="flex flex-col text-center py-2 pb-2 px-4 gap-4">
          <h3>{product.name}</h3>
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-end gap-1 items-center">
              <span>
                <ShoppingCartOutlined style={{ color: 'green' }} />
              </span>
              <span>
                <HeartTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
            <div className="flex justify-end gap-1 items-center">
              <span>{product.price}</span>
              <span>تومان</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
