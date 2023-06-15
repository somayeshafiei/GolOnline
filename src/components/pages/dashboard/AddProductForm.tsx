// import { AddProduct } from "@/actions";
'use client';
import { useState } from 'react';
// import AddProductModal from './AddProductModal';
import { Button, Form, Input, Modal, Select, Upload, UploadFile } from 'antd';
import { AddProduct } from '@/actions';
import { Subcategory, Category } from '@/interfaces';

import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
interface Props {
  categories: Category[];
}
export default function AddProductForm({ categories }: Props) {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState([]);
  const [modal1Open, setModal1Open] = useState(false);
  const [form] = Form.useForm();
  const test = categories.map((ca) => {
    return { value: ca.name, label: ca.name };
  });
  console.log(test);
  const handleChange = (value: string) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    // setSubcategory([]);
    setCategory(value);
    const ts = categories.find((c) => c.name == value);
    console.log(ts);
    axios
      .get(`http://localhost:8000/api/subcategories?category[_id]=${ts?._id}`)
      .then((res) => {
        console.log(res.data.data.subcategories);
        setSubcategory(res.data.data.subcategories);
      });
  };
  const fileList: UploadFile[] = [
    {
      uid: '0',
      name: 'xxx.png',
      status: 'uploading',
      percent: 33,
    },
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];
  return (
    <>
      <form action={() => setModal1Open(true)}>
        <button
          type="submit"
          className="p-2 px-4 font-semibold text-white bg-green-500 rounded-md text-md"
        >
          افزودن کالا
        </button>
      </form>
      <Modal
        title="افزودن/ویرایش کالا"
        centered
        // style={{ top: 20 }}
        open={modal1Open}
        footer={null}
        // onOk={() => {
        //   AddProduct();
        //   setModal1Open(false);
        // }}
        onCancel={() => setModal1Open(false)}
      >
        <Form
          // action={}
          form={form}
          labelCol={{ span: 4 }}
          style={{ paddingTop: '30px' }}
          // wrapperCol={{ span: 14 }}
          autoComplete="off"
          onFinish={(values) => console.log(values)}
          // onFinish={(values) => {
          //   const data = new FormData();
          //   data.append('username', values.username);
          //   data.append('password', values.password);
          //   const finalData = Object.fromEntries(data);
          //   console.log(values);
          //   console.log(finalData);
          //   instance
          //     .post('auth/login', JSON.stringify(finalData), {
          //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //     })
          //     .then((res) => {
          //       console.log(res);
          //       if (res.data.status === 'success') {
          //         if (res.data.data.user.role === 'ADMIN') {
          //           const accessToken = res.data.token.accessToken;
          //           const refreshToken = res.data.token.refreshToken;
          //           const cookies = new Cookies();
          //           cookies.set('accessToken', accessToken, { path: '/' });
          //           cookies.set('refreshToken', refreshToken, {
          //             path: '/',
          //           });
          //           router.push('/dashboard');
          //         } else if (res.data.data.user.role !== 'ADMIN') {
          //           alert('اجازه ورود به پنل را ندارید');
          //           return <p>اجازه ورود به پنل ادمین را ندارید.</p>;
          //         }
          //       }
          //     });
          // }}
        >
          <Form.Item
            name="username"
            label="نام کالا"
            rules={[
              {
                required: true,
                message: 'لطفا نام کالا را وارد نمایید',
              },
              { whitespace: true, message: 'نام کالا نمی تواند خالی باشد' },
              // ({getFieldValue})=>({
              //   validator(_,value){
              //     if(!value)
              //   }
              // })
            ]}
            hasFeedback
          >
            <Input
              placeholder="نام کالا را وارد کنید"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            // wrapperCol={{ span: 12 }}
            name="price"
            label="قیمت کالا"
            rules={[
              {
                required: true,
                message: 'لطفا قیمت کالا را وارد کنید',
              },
              { whitespace: true, message: 'قیمت کالا نمی تواند خالی باشد' },
            ]}
            hasFeedback
          >
            <Input
              type="number"
              style={{ width: '100%' }}
              placeholder="قیمت کالا را وارد کنید"
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="دسته بندی"
            rules={[
              { required: true, message: 'دسته بندی را انتخاب کنید' },
              // ({getFieldValue})=>({
              //   console.log()
              //   // validator(_,value){
              //   //   cons
              //   // }
              // })
            ]}
          >
            <Select
              showSearch
              placeholder="جستجوی دسته بندی کالا..."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              style={{ width: '100%' }}
              onChange={handleChange}
              options={test}
            />
          </Form.Item>
          <Form.Item
            name="subcategory"
            label=" زیر شاخه"
            rules={[{ required: true, message: 'زیر شاخه را انتخاب کنید' }]}
          >
            <Select
              // disabled
              // value={subcategory}
              // showSearch
              placeholder="جستجوی زیر شاخه کالا..."
              // optionFilterProp="children"
              // filterOption={(input, option) =>
              //   (option?.label ?? '').includes(input)
              // }
              // filterSort={(optionA, optionB) =>
              //   (optionA?.label ?? '')
              //     .toLowerCase()
              //     .localeCompare((optionB?.label ?? '').toLowerCase())
              // }
              // style={{ width: '100%' }}
              // onChange={(value) => setSubcategory(value)}
              options={
                category !== ''
                  ? subcategory.map((item: Subcategory) => {
                      return { label: item.name, value: item.name };
                    })
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item
            label="thumbnail"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: 'عکس کوچک کالا را آپلود نمایید',
              },
            ]}
          >
            <Upload
              // action="https://localhost:8000/images/products/thumbnail"
              listType="picture"
              // defaultFileList={[...fileList]}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: 'green' }}
            >
              افزودن محصول
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
