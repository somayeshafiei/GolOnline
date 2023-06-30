'use client';
import Loading from '@/app/loading';
import useCartStore from '@/store/store';
import { Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import Cookies from 'universal-cookie';

const Payment = () => {
  const cookies = new Cookies();
  const user = cookies.get('userId');
  const { products, deliveryDate, clearState } = useCartStore();
  const router = useRouter();
  console.log(products);
  console.log(user);
  console.log(deliveryDate);
  function handlePay() {
    const orderData = {
      user,
      products,
      deliveryDate: +deliveryDate * 1000,
    };
    console.log(JSON.stringify(orderData));
    const data = JSON.stringify(orderData);
    axios
      .post(`http://localhost:8000/api/orders`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 'success') {
          message.success('پرداخت با موفقیت انجام شد');
          setTimeout(() => router.push('/payment/success'), 10);
          clearState();
          // localStorage.removeItem('global');
          // router.push('/payment/success');
        }
      })
      .catch((error) => {
        console.log(error);
        message.success('پرداخت با مشکل روبرو شد.مجدد امتحان کنید');
        setTimeout(() => router.push('/payment/fail'), 10);
        // alert('پرداخت موفقیت آمیز نبود. لطفا دوباره تلاش کنید');
      });
  }
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
        <h1 className="font-bold text-2xl pb-5">صفحه پرداخت</h1>
        <div className="w-full flex justify-center items-center gap-5">
          {/* <form action={}> */}
          <Button onClick={handlePay}>پرداخت</Button>
          {/* </form> */}
          <Button danger>انصراف</Button>
        </div>
      </div>
    </Suspense>
  );
};

export default Payment;
