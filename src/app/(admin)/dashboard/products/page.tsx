import { AddProduct } from '@/actions';
import AddProductForm from '@/components/pages/dashboard/AddProductForm';
import ProductsTable from '@/components/pages/dashboard/ProductsTable';

export async function getData() {
  const res = await fetch('http://localhost:8000/api/products', {
    next: { tags: ['products'] },
  });
  // ?page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
export async function getCategories() {
  const res = await fetch('http://localhost:8000/api/categories', {
    next: { tags: ['products'] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
const dashboardProductsPage = async () => {
  const res = await getData();
  const result = [...res.data.products];
  const categories = await getCategories();
  const categoriesResult = [...categories?.data.categories];
  console.log(categoriesResult);

  return (
    <>
      <div className="flex flex-col gap-5 px-4 md:px-10 pt-24">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-lg">مدیریت کالاها</h2>
          <AddProductForm categories={categoriesResult} />
          {/* <form action={AddProduct}>
            <button
              type="submit"
              className="bg-green-500 p-2 px-4 text-white font-semibold text-md rounded-md"
            >
              افزودن کالا
            </button>
          </form> */}
        </div>
        <ProductsTable products={result} />
      </div>
    </>
  );
};
export default dashboardProductsPage;
