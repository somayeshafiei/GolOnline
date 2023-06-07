import ProductsTable from '@/components/pages/dashboard/ProductsTable';

export async function getData() {
  const res = await fetch(
    'http://localhost:8000/api/products?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8'
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function dashboardProductsPage() {
  const res = await getData();
  const result = [...res.data.products];

  return (
    <>
      <ProductsTable products={result} />
    </>
  );
}
