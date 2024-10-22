import InventoryTable from '@/components/pages/dashboard/InventoryTable';
export async function getData() {
  const res = await fetch('http://localhost:8000/api/products?limit=all');
  // page=1&limit=4&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function dashboardInventory_pricePage() {
  const res = await getData();
  const result = [...res?.data.products];
  return (
    <>
      <div className="flex flex-col gap-5 px-4 md:px-10 pt-24">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-lg">مدیریت موجودی و قیمت ها</h2>
          <button className="bg-green-500 p-2 px-4 text-white font-semibold text-md rounded-md">
            ذخیره
          </button>
        </div>
        <InventoryTable products={result} />
      </div>
    </>
  );
}
