import ProductDetail from '@/components/pages/product/ProductDetail';
import React from 'react';
async function getSingleProduct(id: string) {
  const res = await fetch(`http://localhost:8000/api/products/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
const SingleProduct = async ({ params }: any) => {
  const product = await getSingleProduct(params.id);
  const productDetail = product?.data?.product;
  console.log(productDetail);
  return (
    <div className="w-full px-5 sm:px-10 md:px-[120px] py-8 pt-16">
      <ProductDetail productDetail={productDetail} />
    </div>
  );
};

export default SingleProduct;
