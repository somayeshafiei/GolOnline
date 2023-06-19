// import { AddProduct } from "@/actions";
'use client';
import { useEffect, useRef, useState } from 'react';
// import AddProductModal from './AddProductModal';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  message,
} from 'antd';
import { AddProduct } from '@/actions';
import { Subcategory, Category } from '@/interfaces';

import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import Image from 'next/image';
interface Props {
  categories: Category[];
}
export default function AddProductForm({ categories }: Props) {
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState('');
  const [modal1Open, setModal1Open] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagesPreview, setImagesPreview] = useState('');
  const [form] = Form.useForm();
  const thumbNailInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const test = categories.map((ca) => {
    return { value: ca.name, label: ca.name };
  });
  console.log(test);
  const handleChangeCategory = (value: string) => {
    console.log(value);
    setCategory(value);
    const ctg = categories?.find((c) => c.name == category);
    console.log(ctg?._id);
    const ts = categories.find((c) => c.name == value);
    ctg && setCategoryId(ctg._id);
    axios
      .get(`http://localhost:8000/api/subcategories?category[_id]=${ts?._id}`)
      .then((res) => {
        console.log(res.data.data.subcategories);
        setSubcategory(res.data.data.subcategories);
      });
  };
  function handleChangeSubCategory(value: string) {
    console.log(value);
    const valueSubCategory = value;
    axios
      .get(`http://localhost:8000/api/subcategories?name=${valueSubCategory}`)
      .then((res) => {
        console.log(res.data.data.subcategories[0]._id);
        setSubcategoryId(res.data.data.subcategories[0]._id);
      });
  }
  const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];
  // const thumbnailPrev = thumbNailInputRef.current?.files[0];
  useEffect(() => {
    console.log(thumbnailPreview);
  }, [thumbnailPreview, thumbNailInputRef.current]);
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
          labelCol={{ span: 6 }}
          style={{ paddingTop: '30px' }}
          // wrapperCol={{ span: 14 }}
          autoComplete="off"
          // onFinish={(values) => console.log(values)}
          onFinish={(values) => {
            const data = new FormData();
            const thumbNail = thumbNailInputRef.current?.files[0];

            console.log(`Selected file: ${thumbNail}`);
            const imagesFile = imagesInputRef.current?.files[0];

            const ctg = categories?.find((c) => c.name == category);
            console.log(ctg?._id);
            const categoryId = ctg?._id;
            data.append('name', values.name);
            data.append('brand', values.brand);
            data.append('price', values.price);
            data.append('description', values.description);
            data.append('category', categoryId);
            data.append('subcategory', subcategoryId);
            data.append('thumbnail', thumbNail);
            // Array.isArray(imagesPreview) &&
            //   imagesPreview.map((i, index) =>
            //     data.append('images', i.files[index])
            //   );
            data.append('images', imagesFile);
            const finalData = Object.fromEntries(data);
            console.log(values);
            console.log(finalData);
            const cookies = new Cookies();
            const accessToken = cookies.get('accessToken');
            AddProduct(data, accessToken);
          }}
        >
          <Form.Item
            name="name"
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
              onChange={handleChangeCategory}
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
              placeholder="جستجوی زیر شاخه کالا..."
              onChange={handleChangeSubCategory}
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
            name="quantity"
            label="تعداد کالا"
            rules={[
              {
                required: true,
                message: 'لطفا تعداد کالا را وارد کنید',
              },
              { whitespace: true, message: 'تعداد کالا نمی تواند خالی باشد' },
            ]}
            hasFeedback
          >
            <Input
              type="number"
              style={{ width: '100%' }}
              placeholder="تعداد کالا را وارد کنید"
            />
          </Form.Item>
          <Form.Item
            name="brand"
            label="برند کالا"
            rules={[
              {
                required: true,
                message: 'لطفا برند کالا را وارد نمایید',
              },
              { whitespace: true, message: 'برند کالا نمی تواند خالی باشد' },
              // ({getFieldValue})=>({
              //   validator(_,value){
              //     if(!value)
              //   }
              // })
            ]}
            hasFeedback
          >
            <Input
              placeholder="برند کالا را وارد کنید"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            label="thumbnail"
            name="thumbnail"
            // valuePropName="fileList"
            // getValueFromEvent={(event) => {
            //   return event?.fileList;
            // }}
            // rules={[
            //   {
            //     required: true,
            //     message: 'عکس کوچک کالا را آپلود نمایید',
            //   },
            //   {
            //     validator(_, fileList) {
            //       return new Promise((resolve, reject) => {
            //         if (fileList && fileList[0].size > 900000) {
            //           reject('حجم فایل زیاد است');
            //         } else {
            //           resolve('اضافه شد');
            //         }
            //       });
            //     },
            //   },
            // ]}
          >
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              ref={thumbNailInputRef}
              // value={thumbnail}
              onChange={(e) => setThumbnailPreview(e?.target?.files[0])}
            ></input>
            <div className="w-full pt-5 flex gap-5">
              {thumbnailPreview && (
                <Image
                  src={URL.createObjectURL(thumbnailPreview)}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                />
              )}
            </div>

            {/* <Upload
              maxCount={1}
              action="https://localhost:8000/images/products/thumbnail"
              listType="picture"
              // defaultFileList={[...fileList]}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 900000) {
                    reject('حجم فایل زیاد است');
                    message.error('حجم فایل زیاد است');
                  } else {
                    resolve('اضافه شد');
                  }
                });
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}
          </Form.Item>
          <Form.Item
            label="تصویر"
            name="images"
            // valuePropName="fileList"
            // getValueFromEvent={(event) => {
            //   return event?.fileList;
            // }}
            rules={
              [
                // {
                //   required: true,
                //   message: 'عکس  کالا را آپلود نمایید',
                // },
                // {
                //   validator(_, fileList) {
                //     return new Promise((resolve, reject) => {
                //       if (fileList && fileList[0].size > 900000) {
                //         reject('حجم فایل زیاد است');
                //       } else {
                //         resolve('اضافه شد');
                //       }
                //     });
                //   },
                // },
              ]
            }
          >
            <input
              type="file"
              name="images"
              accept="image/png, image/jpeg"
              ref={imagesInputRef}
              // value="images"
              onChange={(e) => setImagesPreview(Array.from(e.target.files))}
              multiple
            ></input>
            <div className="w-full pt-5 flex gap-5">
              {imagesPreview &&
                Array.isArray(imagesPreview) &&
                imagesPreview.map((i, index) => (
                  <Image
                    key={i.index}
                    src={URL.createObjectURL(imagesPreview[index])}
                    alt="Thumbnail"
                    width={60}
                    height={60}
                  />
                ))}
            </div>

            {/* <Upload
              maxCount={1}
              action="https://localhost:8000/images/products/thumbnail"
              listType="picture"
              // defaultFileList={[...fileList]}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 900000) {
                    reject('حجم فایل زیاد است');
                    message.error('حجم فایل زیاد است');
                  } else {
                    resolve('اضافه شد');
                  }
                });
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}
          </Form.Item>
          <Form.Item
            name="description"
            label="توضیحات کالا"
            rules={[
              {
                required: true,
                message: 'لطفا توضیحات کالا را وارد نمایید',
              },
              { whitespace: true, message: 'توضیحات کالا نمی تواند خالی باشد' },
              // ({getFieldValue})=>({
              //   validator(_,value){
              //     if(!value)
              //   }
              // })
            ]}
            hasFeedback
          >
            <Input
              placeholder="توضیحات کالا را وارد کنید"
              style={{ width: '100%' }}
            />
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
