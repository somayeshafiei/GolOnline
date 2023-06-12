import instance from '@/api/constants';
import OrdersTable from '@/components/pages/dashboard/OrdersTable';

export async function getData() {
  const res = await instance.get(`http://localhost:8000/api/orders`);
  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.data;
}

export default async function dashboardOrdersPage() {
  const res = await getData();
  const result = [...res.data.orders];
  console.log(result);
  return (
    <>
      <div className="flex flex-col gap-5 px-4 md:px-10 pt-24">
        <div className="flex w-full justify-between">
          <h2 className="font-bold text-lg">مدیریت سفارش ها</h2>
        </div>
        <OrdersTable orders={result} />
      </div>
    </>
  );
}
