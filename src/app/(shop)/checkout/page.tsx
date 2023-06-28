'use client';
import Loading from '@/app/loading';
import { Button, Form, Input } from 'antd';
import React, { Suspense } from 'react';
import Cookies from 'universal-cookie';

const Checkout = () => {
  const cookies = new Cookies();
  const userFirstName = cookies.get('userFirstName');
  const userLastName = cookies.get('userLastName');

  console.log(userFirstName);
  console.log(userLastName);
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
        <h1 className="pb-4">نهایی کردن سبد خرید:</h1>
        <Form
          onFinish={(values) => console.log(values)}
          className="p-3 border rounded-md bg-green-50 w-full"
        >
          <div className="flex justify-between items-center w-full p-3">
            <Form.Item name={'name'} initialValue={userFirstName} label="نام:">
              <Input value={userFirstName} disabled></Input>
            </Form.Item>
            <Form.Item
              name={'lastname'}
              initialValue={userLastName}
              label="نام خانوادگی"
            >
              <Input value={userLastName} disabled></Input>
            </Form.Item>
          </div>
          <div className="flex justify-between items-center w-full p-3">
            <Form.Item name={'address'} label="آدرس">
              <textarea className="border"></textarea>
            </Form.Item>
            <Form.Item name={'phone'} label="شماره تلفن">
              <Input></Input>
            </Form.Item>
          </div>
          {/* <Form.Item>

          </Form.Item> */}

          <Form.Item>
            <Button htmlType="submit">پرداخت</Button>
          </Form.Item>
        </Form>
      </div>
    </Suspense>
  );
};
export default Checkout;
