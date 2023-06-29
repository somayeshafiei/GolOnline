'use client';
import Loading from '@/app/loading';
import { Button, Result } from 'antd';
import { Suspense } from 'react';
import Link from 'next/link';
const SuccessPayment = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
        <Result
          status="success"
          title="پرداخت موفقیت آمیز"
          subTitle="با تشکر از پرداخت شما.سفارش شما ثبت شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد"
          extra={[
            <Link key="console" href={'/'}>
              <Button>رفتن به صفحه اصلی</Button>
            </Link>,
            // <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>
    </Suspense>
  );
};
export default SuccessPayment;
