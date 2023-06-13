'use server';
import { revalidateTag } from 'next/cache';

async function DeleteProduct(record: string, accessToken: string) {
  console.log(record);
  console.log(accessToken);
  try {
    const res = await fetch(`http://localhost:8000/api/products/${record}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const result = await res.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  revalidateTag('products');
  // instance.delete(`http://localhost:8000/api/products/${record?._id}`);
  // Modal.confirm({
  //   title: 'از حذف این محصول اطمینان دارید؟',
  //   okText: 'بله',
  //   okType: 'danger',
  //   cancelText: 'خیر',
  //   onOk: () => {
  //     const cookies = new Cookies();
  //     instance.delete(`http://localhost:8000/api/products/${record?._id}`);
  //     revalidateTag('products');
  //     return setDataSource((pre) => {
  //       return pre.filter((pro) => pro._id !== record._id);
  //     });
  //   },
  // });
}
export default DeleteProduct;
