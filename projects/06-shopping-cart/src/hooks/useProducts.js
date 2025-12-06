import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        const mappedProducts = data.products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images,
        }));

        setProducts(mappedProducts);
      } catch {
        throw new Error('Error fetching products');
      }
    };

    getProducts();
  }, []);

  return { products };
};
