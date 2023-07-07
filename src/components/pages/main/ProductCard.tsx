import Product from '@/interfaces';
import React from 'react';
import Image from 'next/image';
import { HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button, Rate, message } from 'antd';
import useCartStore from '@/store/store';
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
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
  const itemCount = getProductCount(product._id);
  return (
    <div
      className="flex flex-col w-64 rounded-lg border shadow hover:shadow-lg"
      dir="rtl"
    >
      <div className="relative w-full h-64 rounded-t-lg">
        <Image
          fill
          src={`http://localhost:8000/images/products/images/${product.images[0]}`}
          alt={`${product.images[0]}`}
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col text-center py-2 pb-2 px-4 gap-4 bg-white pt-3 rounded-b-lg">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex justify-center items-center w-full">
          <Rate disabled defaultValue={product.rating.rate} />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-end gap-1 items-center">
            {itemCount < product.quantity ? (
              <Button
                onClick={() => {
                  itemCount === 0
                    ? (addToCart(product._id),
                      message.success('محصول با موفقیت به سبد خرید اضافه شد'))
                    : (addToCart(product._id),
                      message.info(
                        'تعداد محصول مورد نظر در سبد خرید اضافه شد'
                      ));
                }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 20, color: 'green' }}
                />
              </Button>
            ) : (
              <Button
                disabled
                onClick={() => message.error('محصول موجود نیست')}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 20, color: 'green' }}
                />
              </Button>
            )}
            {/* <button className="h-10 w-10">
              <ShoppingCartOutlined style={{ fontSize: 20, color: 'green' }} />
            </button> */}
          </div>
          <div className="flex justify-end gap-1 items-center">
            <span>{product.price}</span>
            <span>تومان</span>
          </div>
        </div>

        <Link href={`/products/${product._id}`}>
          <Button
            className="w-full mt-2 bg-[#965e89] text-white"
            type="primary"
          >
            جزئیات محصول
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
