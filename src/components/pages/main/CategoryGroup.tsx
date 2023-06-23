'use client';

import Product from '@/interfaces';

interface Props {
  allCategories: string[];
  allProducts: Product[];
}
export function CategoryGroup({ allCategories, allProducts }: Props) {
  return (
    <>
      {allCategories.map((ctg, index) => (
        <div key={index}>
          <h1>{ctg}</h1>
          {/* {allProducts.map(pro=>pro.category.name===ctg)} */}
        </div>
      ))}
    </>
  );
}
