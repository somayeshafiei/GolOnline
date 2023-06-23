import { CategoryGroup } from '@/components/pages/main/CategoryGroup';
import { Category } from '@/interfaces';

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
export default async function Home() {
  const res = await getData();
  const result = [...res.data.products];
  const categories = await getCategories();
  const categoriesResult = [...categories?.data.categories];
  console.log(categoriesResult?.map((ca: Category) => ca.name));
  const allCategoriesName = categoriesResult?.map((ca: Category) => ca.name);
  // console.log(result);
  return (
    <div className="w-full px-[120px] pt-8">
      {/* <h1>صفحه اصلی</h1> */}
      <CategoryGroup allCategories={allCategoriesName} allProducts={result} />
    </div>
  );
}
