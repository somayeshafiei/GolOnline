'use client';

import Product, { Category, Subcategory } from '@/interfaces';
import { Button, Input, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Form } from 'antd';
import axios from 'axios';
interface Props {
  record: Product;
  categories: Category[];
}
export default function EditProductForm({ record, categories }: Props) {
  const [modal1Open, setModal1Open] = useState(false);
  const [initialSubCategories, setInitialSubCategories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(record.thumbnail);
  const thumbNailInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [form] = Form.useForm();
  const test = categories.map((ca) => {
    return { value: ca.name, label: ca.name };
  });
  console.log(record.images);
  const initialValues = {
    category: record.category.name,
    subcategory: record.subcategory.name,
    name: record.name,
    price: record.price,
    quantity: record.quantity,
    brand: record.brand,
    description: record.description,
    thumbnail: record.thumbnail,
    images: record.images,
  };
  const subcategoryRef = useRef([]);
  function handleClickSubCategory() {
    const ctgId = record.category._id;
    axios
      .get(`http://localhost:8000/api/subcategories?category[_id]=${ctgId}`)
      .then((res) => {
        console.log(res.data.data.subcategories);
        setInitialSubCategories(res.data.data.subcategories);
        // subcategoryRef.current = res.data.data.subcategories;
      });
  }
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
  // useEffect(() => {
  // const thumbNailInput = thumbNailInputRef?.current;
  // // Create a new File object
  // const myFile = new File(['Hello World!'], `${record.thumbnail}.jpg`, {
  //   type: 'image/jpeg',
  //   lastModified: new Date().getTime(),
  // });

  // // Now let's create a DataTransfer to get a FileList
  // const dataTransfer = new DataTransfer();
  // dataTransfer.items.add(myFile);

  // // Set the files property of the input element to the FileList obtained from the DataTransfer
  // if (thumbNailInput) {
  //   thumbNailInput.files = dataTransfer.files;
  // }
  //   // if (thumbNailInputRef.current) {
  //   //   thumbNailInputRef.current.defaultValue = `${record.thumbnail}.jpg`;
  //   // }
  // }, [record]);
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setImagesPreview(record.images);
      const thumbNailInput = thumbNailInputRef?.current;
      // Create a new File object
      const myFile = new File(['Hello World!'], `${record.thumbnail}.jpg`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      });

      // Now let's create a DataTransfer to get a FileList
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(myFile);

      // Set the files property of the input element to the FileList obtained from the DataTransfer
      if (thumbNailInput) {
        thumbNailInput.files = dataTransfer.files;
      }
    }
  }, [initialValues, thumbNailInputRef?.current]);
  return (
    <>
      <form action={() => setModal1Open(true)}>
        <Button htmlType="submit">ویرایش</Button>
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
        destroyOnClose
        onCancel={() => setModal1Open(false)}
        afterClose={() => form.resetFields()}
      >
        <Form
          preserve={false}
          form={form}
          labelCol={{ span: 6 }}
          style={{ paddingTop: '30px' }}
          autoComplete="off"
          initialValues={initialValues}
          onFinish={(values) => {
            console.log(values);
            // const thumbNail = thumbNailInputRef?.current?.files[0];

            // const imagesFile = imagesInputRef?.current?.files[0];
            // console.log(`Selected file: ${thumbNail}`);
            // console.log(imagesFile);
          }}
        >
          <Form.Item
            name="name"
            label="نام کالا"
            // initialValue={record.name}
            rules={[
              {
                required: true,
                message: 'لطفا نام کالا را وارد نمایید',
              },
              { whitespace: true, message: 'نام کالا نمی تواند خالی باشد' },
            ]}
            hasFeedback
          >
            <Input
              placeholder="نام کالا را وارد کنید"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="قیمت کالا"
            rules={[
              {
                required: true,
                message: 'لطفا قیمت کالا را وارد کنید',
              },
            ]}
            hasFeedback
          >
            <Input
              defaultValue={record.price}
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
              // ref={subcategoryRef}
              // disabled
              placeholder="جستجوی زیر شاخه کالا..."
              // onClick={handleClickSubCategory}
              // value={initialSubCategories && initialSubCategories}
              options={
                category !== ''
                  ? subcategory.map((item: Subcategory) => {
                      return { label: item.name, value: item.name };
                    })
                  : undefined
              }
              // options={initialSubCategories}
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
            ]}
            hasFeedback
          >
            <Input
              placeholder="برند کالا را وارد کنید"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="thumbnail" name="thumbnail">
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              ref={thumbNailInputRef}
            ></input>
            <div className="w-full pt-5 flex gap-5">
              {thumbnailPreview && (
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${thumbnailPreview}`}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                />
              )}
            </div>
          </Form.Item>
          <Form.Item
            label="تصویر"
            name="images"
            // rules={[
            //   {
            //     required: true,
            //     message: 'عکس  کالا را آپلود نمایید',
            //   },
            // ]}
          >
            <input
              type="file"
              name="images"
              accept="image/png, image/jpeg"
              ref={imagesInputRef}
            ></input>
            {
              <div className="w-full pt-5 flex gap-5">
                {(imagesPreview && (
                  <Image
                    src={`http://localhost:8000/images/products/images/${imagesPreview}`}
                    alt="Thumbnail"
                    width={60}
                    height={60}
                  />
                )) ||
                  (Array.isArray(imagesPreview) &&
                    imagesPreview.map((i, index) => {
                      return (
                        <Image
                          key={i[index]}
                          src={`http://localhost:8000/images/products/images/${imagesPreview[index]}`}
                          alt="images"
                          width={60}
                          height={60}
                        />
                      );
                    }))}
              </div>
            }
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
              ویرایش محصول
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
