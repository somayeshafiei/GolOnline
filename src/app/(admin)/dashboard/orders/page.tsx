import instance from '@/api/constants';
import OrdersTable from '@/components/pages/dashboard/OrdersTable';

// export async function getData() {
//   const res = await instance.get(`http://localhost:8000/api/orders`);
//   if (res.status !== 200) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.data;
// }
export async function getOrders() {
  const res = await fetch('http://localhost:8000/api/orders?limit=all', {
    cache: 'no-store',
    next: { tags: ['orders'] },
  });
  // , {
  //   next: { tags: ['products'] },
  // }
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function dashboardOrdersPage() {
  const res = await getOrders();
  const result = [...res.data.orders];
  console.log(result);
  return (
    <>
      <div className="flex flex-col gap-5 px-4 md:px-10 pt-10 ">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-lg">مدیریت سفارش ها</h2>
        </div>
        <OrdersTable orders={result} />
      </div>
    </>
  );
}
