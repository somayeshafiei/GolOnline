import Main from '@/components/pages/category/Main';
import ProductCard from '@/components/pages/main/ProductCard';
import Product from '@/interfaces';
import React from 'react';

async function getSingleCategory(id: string) {
  const res = await fetch(
    `http://localhost:8000/api/products?limit=all&category[_id]=${id}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function SingleCategory({ params }: any) {
  const category = await getSingleCategory(params.id);
  const categoryProducts = [...category?.data?.products];
  console.log(categoryProducts);
  return (
    <>
      <Main categoryProducts={categoryProducts} />
    </>
  );
}
