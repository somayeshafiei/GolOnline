'use client';

import Product, { Category } from '@/interfaces';
import { Divider } from 'antd';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface Props {
  categoriesResult: Category[];
  allProducts: Product[];
}
export function CategoryGroup({ categoriesResult, allProducts }: Props) {
  const allCategoriesName = categoriesResult?.map((ca: Category) => ca.name);
  return (
    <>
      {categoriesResult.map((ctg, index) => (
        <div key={index}>
          <Divider>
            <Link href={`/category/${ctg._id}`}>{ctg.name}</Link>
          </Divider>
          <div className="flex flex-col justify-center items-center sm:flex-row w-full gap-6 sm:flex-wrap">
            {allProducts.map(
              (pro) =>
                pro.category.name === ctg.name && (
                  <ProductCard product={pro} key={pro._id} />
                )
            )}
          </div>
        </div>
      ))}
    </>
  );
}
