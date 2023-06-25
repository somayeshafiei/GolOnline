'use client';

import Product from '@/interfaces';
import ProductCard from '../main/ProductCard';

interface Props {
  categoryProducts: Product[];
}
const Main = ({ categoryProducts }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row w-full gap-6 sm:flex-wrap">
      {categoryProducts &&
        categoryProducts.map((pro: Product) => {
          return <ProductCard product={pro} key={pro._id} />;
        })}
    </div>
  );
};
export default Main;
