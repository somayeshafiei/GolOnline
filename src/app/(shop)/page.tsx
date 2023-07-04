import CategoriesBoxWrapper from '@/components/pages/main/CategoriesBoxWrapper';
import OnlineBuying from '@/components/pages/main/OnlineBuying';
import HomePageSlider from '@/components/pages/main/Slider';
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
    <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
      <div className="w-full h-[300px]">
        <HomePageSlider />
      </div>
      <CategoriesBoxWrapper />
      <OnlineBuying categoriesResult={categoriesResult} allProducts={result} />
    </div>
  );
}
