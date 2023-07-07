'use client';
import { Divider, Tabs } from 'antd';
import Product, { Category } from '@/interfaces';
import ProductCard from './ProductCard';
import Image from 'next/image';
interface Props {
  categoriesResult: Category[];
  allProducts: Product[];
}
const OnlineBuying = ({ categoriesResult, allProducts }: Props) => {
  return (
    <section className="w-full min-h-[500px] bg-gray-50 p-3 my-8 pb-5 rounded-md">
      <Divider>
        <h2 className="text-xl font-semibold">خرید گل از گل آنلاین</h2>
      </Divider>
      <div dir="ltr">
        <Tabs defaultActiveKey="1" centered className="mt-8">
          {categoriesResult.map((category) => {
            const filteredProducts = allProducts
              .filter((product) => product.category._id === category._id)
              .slice(0, 4);
            return (
              <Tabs.TabPane
                tab={
                  <div className="flex flex-col justify-center gap-2 h-20 items-center text-center">
                    <Image
                      src={`http://localhost:8000/images/categories/icons/${category.icon}`}
                      alt={category.icon}
                      width={35}
                      height={35}
                    />
                    <span>{category.name}</span>
                  </div>
                }
                key={category._id}
              >
                <div
                  className="flex flex-col justify-center items-center sm:flex-row w-full gap-6 sm:flex-wrap"
                  dir="rtl"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
export default OnlineBuying;
