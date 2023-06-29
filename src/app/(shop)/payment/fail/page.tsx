'use client';
import Loading from '@/app/loading';
import { Button, Result } from 'antd';
import { Suspense } from 'react';
import Link from 'next/link';
const FailPayment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
        <Result
          status="error"
          title=" پرداخت ناموفق"
          subTitle="پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است."
          extra={[
            <Link key="console" href={'/'}>
              <Button>رفتن به صفحه اصلی</Button>
            </Link>,
            <Link key="buy" href={'/cart'}>
              <Button danger>خرید مجدد</Button>
            </Link>,
          ]}
        />
      </div>
    </Suspense>
  );
};
export default FailPayment;
