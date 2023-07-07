'use client';
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import instance from '@/api/constants';
import Cookies from 'universal-cookie';
import { LogoutOutlined } from '@ant-design/icons';
import logo1 from '../../images/test.png';
import Image from 'next/image';
const FormMaker = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  return (
    <div className="flex justify-center items-center flex-col w-full relative w-[50%]">
      {/* <Image src={logo1} alt="logo" height={20} width={120} /> */}
      <h1 className="text-center py-5 font-bold text-lg">فرم ورود به سایت</h1>
      <Form
        className=" pb-3"
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
                if (res.data.data.user.role === 'ADMIN') {
                  const userFirstName = res.data.data.user.firstname;
                  const userLastName = res.data.data.user.lastname;
                  const userId = res.data.data.user._id;
                  const accessToken = res.data.token.accessToken;
                  const refreshToken = res.data.token.refreshToken;
                  const cookies = new Cookies();
                  cookies.set('accessToken', accessToken, { path: '/' });
                  cookies.set('refreshToken', refreshToken, {
                    path: '/',
                  });
                  cookies.set('userFirstName', userFirstName, { path: '/' });
                  cookies.set('userLastName', userLastName, { path: '/' });
                  cookies.set('userId', userId, { path: '/' });
                  message.success('با موفقیت وارد شدید');
                  router.push('/');
                } else if (res.data.data.user.role !== 'ADMIN') {
                  const userFirstName = res.data.data.user.firstname;
                  const userLastName = res.data.data.user.lastname;
                  const userId = res.data.data.user._id;
                  const cookies = new Cookies();
                  cookies.set('userFirstName', userFirstName, { path: '/' });
                  cookies.set('userLastName', userLastName, { path: '/' });
                  cookies.set('userId', userId, { path: '/' });
                  console.log(userFirstName);
                  message.success('با موفقیت وارد شدید');
                  router.push('/');
                }
              } else {
                message.error('اطلاعات وارد شده صحیح نمی باشد. ');
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
            { min: 3, message: 'رمز نمی تواند کمتر از ۳ کاراکتر باشد' },
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
            style={{ backgroundColor: 'green', width: '100%' }}
          >
            ورود
          </Button>
        </Form.Item>
      </Form>
      <span className="absolute bottom-0 left-0 p-2">
        <Link href={'/'}>
          <Button
            block
            type="primary"
            htmlType="button"
            style={{ backgroundColor: 'gray' }}
          >
            <LogoutOutlined rotate={180} />
          </Button>
        </Link>
      </span>
    </div>
  );
};
export default FormMaker;
