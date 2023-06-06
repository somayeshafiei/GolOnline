'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import instance from '@/api/constants';
import Cookies from 'universal-cookie';

const FormMaker = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Link href={'/'}>
        <Button
          block
          type="primary"
          htmlType="button"
          style={{ backgroundColor: 'red' }}
        >
          بازگشت به صفحه اصلی
        </Button>
      </Link>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        autoComplete="off"
        onFinish={(values) => {
          const data = new FormData();
          data.append('username', values.username);
          data.append('password', values.password);
          const finalData = Object.fromEntries(data);
          console.log(values);
          console.log(finalData);
          instance
            .post('auth/login', JSON.stringify(finalData), {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.status === 'success') {
                const accessToken = res.data.token.accessToken;
                const refreshToken = res.data.token.refreshToken;
                const cookies = new Cookies();
                cookies.set('accessToken', accessToken, { path: '/' });
                cookies.set('refreshToken', refreshToken, {
                  path: '/',
                });
                router.push('/dashboard');
              }
            });
        }}
      >
        <Form.Item
          name="username"
          label="نام کاربری"
          rules={[
            {
              required: true,
              message: 'لطفا نام خود را وارد نمایید',
            },
            { whitespace: true, message: 'نام نمی تواند خالی باشد' },
            // ({getFieldValue})=>({
            //   validator(_,value){
            //     if(!value)
            //   }
            // })
          ]}
          hasFeedback
        >
          <Input placeholder="نام خود را وارد کنید" />
        </Form.Item>
        <Form.Item
          name="password"
          label="رمز عبور"
          rules={[
            {
              required: true,
              message: 'لطفا رمز عبور خود را وارد کنید',
            },
            { whitespace: true, message: 'رمز نمی تواند خالی باشد' },
            { min: 3 },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="رمز عبور را وارد کنید" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: 'blue' }}
          >
            ورود به پنل ادمین
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormMaker;
