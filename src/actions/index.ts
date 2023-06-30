'use server';
import { Order } from '@/interfaces';
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
    revalidateTag('products');
  } catch (error) {
    console.log(error);
  }
}
export async function AddProduct(formData: any, accessToken: string) {
  console.log(formData);
  try {
    const res = await fetch(`http://localhost:8000/api/products`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: formData,
    });
    const result = await res.json();
    console.log(result);
    revalidateTag('products');
  } catch (error) {
    console.log(error);
  }
}
export async function EditProduct(
  formData: any,
  accessToken: string,
  id: string
) {
  console.log(formData);
  try {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: formData,
    });
    const result = await res.json();
    console.log(result);
    revalidateTag('products');
  } catch (error) {
    console.log(error);
  }
}
export async function handleDelivery(
  selectedRecord: Order,
  accessToken: string
) {
  const newOrder = {
    // user: selectedRecord.user._id,
    products: selectedRecord.products.map((pro) => {
      const final = {
        product: pro.product._id,
        count: pro.count,
      };
      return final;
    }),
    deliveryStatus: true,
  };
  try {
    const res = await fetch(
      `http://localhost:8000/api/orders/${selectedRecord._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      }
    );
    const result = await res.json();
    console.log(result);
    revalidateTag('orders');
    // setIsModalVisible(false);
  } catch (error) {
    console.log(error);
  }

  console.log(selectedRecord.deliveryStatus);
  // console.log(test);
  // console.log(isModalVisible);
}
export default DeleteProduct;
