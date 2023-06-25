import Link from 'next/link';

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

const SideBar = async () => {
  const res = await getCategories();
  const categoriesResult = [...res?.data.categories];
  console.log(categoriesResult);
  return (
    <div className="flex flex-col h-full bg-[#FBFBFB] px-3 py-5 rounded-md w-[310px]">
      <h2 className="text-center font-bold">دسته بندی ها</h2>
      <div className="flex flex-col gap-4 pt-4 px-2">
        {categoriesResult.map((ctg) => (
          <Link
            href={`/category/${ctg._id}`}
            className="hover:text-[#84C190] visited:hover:text-[#84C190]"
            key={ctg._id}
          >
            <span className="">{ctg.name} </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SideBar;
