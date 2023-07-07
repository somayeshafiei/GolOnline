'use client';

import Product, { Category, Subcategory } from '@/interfaces';
import { Button, Input, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Form } from 'antd';
import axios from 'axios';
import { EditProduct } from '@/actions';
import Cookies from 'universal-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface Props {
  record: Product;
  categories: Category[];
}
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ['right', 'center', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ color: ['red', '#785412'] }],
    [{ background: ['red', '#785412'] }],
  ],
};
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'color',
  'image',
  'background',
  'align',
  'size',
  'font',
];
export default function EditProductForm({ record, categories }: Props) {
  const [editor, setEditor] = useState('');
  const [modal1Open, setModal1Open] = useState(false);
  const [initialSubCategories, setInitialSubCategories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState('');
  const [newImagesPreview, setNewImagesPreview] = useState('');

  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [thumbnailNewPreview, setThumbnailNewPreview] = useState('');

  const thumbNailInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState<string>();
  const [subcategoryId, setSubcategoryId] = useState<string>();
  const [initialsubcategoryId, setInitialSubcategoryId] = useState<string>();

  const [subcategory, setSubcategory] = useState([]);
  const [tests, setTests] = useState(false);
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
    thumbnail: thumbNailInputRef?.current?.files[0],
    images: imagesInputRef?.current?.files,
  };
  function handleInitialSubCategoryId() {
    const ctgName = record.category.name;
    const subCa = record.subcategory.name;
    axios
      .get(`http://localhost:8000/api/subcategories?name=${subCa}`)
      .then((res) => {
        console.log(res.data.data.subcategories[0]._id);
        setInitialSubcategoryId(res?.data?.data?.subcategories[0]._id);
        // return res.data.data.subcategories[0]._id;
        // setInitialSubCategories(res.data.data.subcategories);
        // subcategoryRef.current = res.data.data.subcategories;
      });
  }
  function handleInitialSubCategories() {
    const ctgId = record.category._id;
    axios
      .get(`http://localhost:8000/api/subcategories?category[_id]=${ctgId}`)
      .then((res) => {
        console.log(res.data.data.subcategories);
        setInitialSubCategories(res.data.data.subcategories);
        // subcategoryRef.current = res.data.data.subcategories;
      });
  }
  function handleInitialCategory() {
    const ctg = categories?.find(
      (c: Category) => c.name == record.category.name
    );
    console.log(ctg?._id);
    return ctg?._id;
  }
  const handleChangeCategory = (value: string) => {
    const ctg = categories?.find((c: Category) => c.name == value);
    // console.log(value);
    // console.log(ctg?._id);
    setCategory(value);
    ctg && setCategoryId(ctg._id);
    axios
      .get(`http://localhost:8000/api/subcategories?category[_id]=${ctg?._id}`)
      .then((res) => {
        // console.log(res.data.data.subcategories);
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
  useEffect(() => {
    if (modal1Open) {
      form.setFieldsValue(initialValues);
      setImagesPreview(record.images);
      setThumbnailPreview(record.thumbnail);
      handleInitialSubCategories();
      handleInitialSubCategoryId();
      const thumbNailInput = thumbNailInputRef?.current;
      const imagesInput = imagesInputRef?.current;

      // Create a new File object
      const thumbNailFile = new File(['Hello World!'], `${record.thumbnail}`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      });
      const imagesFiles = new File(['images!'], `${record.images}`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      });
      // Now let's create a DataTransfer to get a FileList
      const thumbNailTransfer = new DataTransfer();
      const imagesTransfer = new DataTransfer();
      thumbNailTransfer.items.add(thumbNailFile);
      imagesTransfer.items.add(imagesFiles);
      if (thumbNailInput) {
        console.log('test');
        // thumbNailInput.files = thumbNailTransfer.files;
      }
      if (imagesInput) {
        // imagesInput.files = imagesTransfer.files;
      }
    }
  }, [modal1Open, setInitialSubCategories, imagesPreview]);
  // useEffect(() => {
  //   console.log(categoryId);
  // }, [category]);

  // useEffect(() => {
  //   // if (initialValues && modal1Open) {
  //   //   form.setFieldsValue(initialValues);
  //   //   setImagesPreview(record.images);
  //   //   setThumbnailPreview(record.thumbnail);
  //   // }
  //   const thumbNailInput = thumbNailInputRef?.current;
  //   const imagesInput = imagesInputRef?.current;
  //   // Create a new File object
  //   const myFile = new File(['Hello World!'], `${record.thumbnail}`, {
  //     type: 'image/jpeg',
  //     lastModified: new Date().getTime(),
  //   });
  //   const imagesFiles = new File(['images!'], `${record.images}`, {
  //     type: 'image/jpeg',
  //     lastModified: new Date().getTime(),
  //   });

  //   // Now let's create a DataTransfer to get a FileList
  //   const dataTransfer = new DataTransfer();
  //   dataTransfer.items.add(myFile);
  //   const imagesTransfer = new DataTransfer();
  //   imagesTransfer.items.add(imagesFiles);

  //   // Set the files property of the input element to the FileList obtained from the DataTransfer
  //   // setTests(true);
  //   console.log(dataTransfer);
  //   console.log(thumbNailInput);
  //   if (thumbNailInput && thumbnailPreview) {
  //     console.log('test');
  //     thumbNailInput.files = dataTransfer.files;
  //   }
  //   if (imagesInput) {
  //     imagesInput.files = imagesTransfer.files;
  //   }
  // }, [initialValues, tests, category]);

  return (
    <>
      <form action={() => setModal1Open(true)}>
        <Button htmlType="submit">ویرایش</Button>
      </form>
      <Modal
        title="افزودن/ویرایش کالا"
        centered
        open={modal1Open}
        footer={null}
        destroyOnClose
        onCancel={() => setModal1Open(false)}
        afterClose={() => form.resetFields()}
        afterOpenChange={(open) => {
          if (open) {
            setTests(!tests);
          }
        }}
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
            console.log(initialSubCategories);
            const initialSubCategory = handleInitialSubCategoryId();
            const initialCategoryId = handleInitialCategory();
            console.log(initialCategoryId);
            const thumbNail = thumbNailInputRef?.current?.files[0];
            const imagesFile = imagesInputRef?.current?.files[0];
            const data = new FormData();
            data.append('name', values.name);
            data.append('brand', values.brand);
            data.append('price', values.price);
            data.append('description', values.description);
            if (categoryId) {
              data.append('category', categoryId);
            } else {
              data.append(
                'category',
                initialCategoryId ? initialCategoryId : ''
              );
            }
            if (subcategoryId) {
              data.append('subcategory', subcategoryId);
            } else if (initialsubcategoryId) {
              data.append('subcategory', initialsubcategoryId);
            }

            if (thumbnailNewPreview) {
              data.append('thumbnail', thumbNail);
            }
            // else {
            //   data.append('thumbnail', thumbNail);
            // }

            // }
            if (newImagesPreview) {
              data.append('images', imagesFile);
            }
            //  else {
            //   data.append('images', imagesPreview);
            // }
            // console.log(`Selected file: ${thumbNail}`);
            console.log(imagesFile);
            const finalData = Object.fromEntries(data);
            console.log(finalData);
            const cookies = new Cookies();
            const accessToken = cookies.get('accessToken');
            EditProduct(data, accessToken, record._id);
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
              // onClick={handleInitialSubCategories}
              // value={initialSubCategories && initialSubCategories}
              onChange={handleChangeSubCategory}
              options={
                category !== ''
                  ? subcategory.map((item: Subcategory) => {
                      return { label: item.name, value: item.name };
                    })
                  : initialSubCategories?.map((item: Subcategory) => {
                      return { label: item.name, value: item.name };
                    })
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
              onChange={(e) => {
                e?.target?.files &&
                  (setThumbnailNewPreview(e?.target?.files[0]),
                  setThumbnailPreview(''));
              }}
            ></input>
            <div className="flex w-full gap-5 pt-5">
              {thumbnailNewPreview ? (
                <Image
                  // src={`http://localhost:8000/images/products/thumbnails/${thumbnailPreview}`}
                  src={URL.createObjectURL(thumbnailNewPreview)}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                />
              ) : (
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${thumbnailPreview}`}
                  // src={URL.createObjectURL(thumbnailPreview)}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                />
              )}
              {/* {thumbnailPreview !== undefined ? (
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${thumbnailPreview}`}
                  // src={URL.createObjectURL(thumbnailPreview)}
                  alt="Thumbnail"
                  width={60}
                  height={60}
                />
              ) : (
                thumbnailNewPreview && (
                  <Image
                    // src={`http://localhost:8000/images/products/thumbnails/${thumbnailPreview}`}
                    src={URL.createObjectURL(thumbnailNewPreview)}
                    alt="Thumbnail"
                    width={60}
                    height={60}
                  />
                )
              )} */}
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
              multiple
              name="images"
              accept="image/png, image/jpeg"
              ref={imagesInputRef}
              onChange={(e) => setNewImagesPreview(Array.from(e.target.files))}
            ></input>
            {
              <div className="flex w-full gap-5 pt-5">
                {/* {imagesPreview &&
                Array.isArray(imagesPreview) &&
                imagesPreview.map((i, index) => (
                  <Image
                    key={i.index}
                    src={URL.createObjectURL(imagesPreview[index])}
                    alt="Thumbnail"
                    width={60}
                    height={60}
                  />
                ))} */}
                {newImagesPreview && Array.isArray(newImagesPreview)
                  ? newImagesPreview.map((i, index) => (
                      <Image
                        key={i.index}
                        src={URL.createObjectURL(newImagesPreview[index])}
                        alt="Thumbnail"
                        width={60}
                        height={60}
                      />
                    ))
                  : imagesPreview && (
                      <Image
                        src={`http://localhost:8000/images/products/images/${imagesPreview[0]}`}
                        alt="Thumbnail"
                        width={60}
                        height={60}
                      />
                    )}
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
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={editor}
              onChange={setEditor}
            />
            {/* <Input
              placeholder="توضیحات کالا را وارد کنید"
              style={{ width: '100%' }}
            /> */}
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
