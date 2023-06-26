'use client';
import Product from '@/interfaces';
import useCartStore from '@/store/store';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems } = useCartStore();
  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = cartItems.map((item) => item.productId);
      const productRequests = productIds.map((id) =>
        fetch(`http://localhost:8000/api/products/${id}`)
          .then((response) => response.json())
          .then((res) => res.data.product)
      );
      const productData = await Promise.all(productRequests);
      setProducts(productData);
    };

    fetchProducts();
  }, [cartItems]);
  return (
    <div className="w-full px-5 sm:px-10 md:px-[120px] py-8">     
      {cartItems?.map((item) => {
        const product = products?.find((p) => p._id === item.productId);
        return (
          <div key={item.productId}>
            <h3>{product?.name}</h3>
            <p>Price: ${product?.price}</p>
            <p>Description: {product?.description}</p>
            <p>Count: {item.count}</p>
            {product?.price && (
              <p>Total Price: ${item.count * product?.price}</p>
            )}
            {/* <p>Total Price: ${item.count * product?.price}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
