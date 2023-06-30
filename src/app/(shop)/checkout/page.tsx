'use client';
import Loading from '@/app/loading';
import { Button, Form, Input } from 'antd';
import React, { Suspense, useState } from 'react';
import Cookies from 'universal-cookie';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { redirect, useRouter } from 'next/navigation';
import useCartStore from '@/store/store';

const Checkout = () => {
  const { deliveryDate, setDeliveryDate } = useCartStore();
  const cookies = new Cookies();
  const userFirstName = cookies.get('userFirstName');
  const userLastName = cookies.get('userLastName');
  const router = useRouter();

  console.log(userFirstName);
  console.log(userLastName);
  const changeRoute = (route: string) => {
    router.push(route);
  };
  const handleDateChange = (date: any) => {
    if (date) {
      const final = date.unix.toString();
      setDeliveryDate(final);
    } else {
      setDeliveryDate(undefined);
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">
        <h1 className="pb-4">نهایی کردن سبد خرید:</h1>
        <Form
          onFinish={(values) => {
            console.log(values);

            if (values && deliveryDate) {
              changeRoute('payment');
            }
          }}
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
            <Form.Item
              name={'address'}
              label="آدرس"
              rules={[
                {
                  required: true,
                  message: 'لطفا آدرس خود را وارد کنید',
                },
                { whitespace: true, message: 'آدرس نمی تواند خالی باشد' },
                { min: 10, message: 'آدرس نمی تواند کمتر از ۱۰ کاراکتر باشد' },
              ]}
              hasFeedback
            >
              <textarea className="border"></textarea>
            </Form.Item>
            <Form.Item
              name={'phone'}
              label="شماره تلفن"
              rules={[
                {
                  required: true,
                  message: 'لطفا شماره تلفن خود را وارد کنید',
                },
                { whitespace: true, message: 'شماره تلفن نمی تواند خالی باشد' },
              ]}
              hasFeedback
            >
              <Input></Input>
            </Form.Item>
          </div>
          <div className="p-3">
            <Form.Item label="تاریخ تحویل" name={'deliveryDate'}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={deliveryDate}
                onChange={(date) => handleDateChange(date)}
                minDate={new Date().setDate(31)}
              />
            </Form.Item>
          </div>
          <Form.Item className="w-full flex justify-center">
            <Button
              htmlType="submit"
              className="bg-green-400 w-44"
              size="large"
            >
              پرداخت
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Suspense>
  );
};
export default Checkout;
