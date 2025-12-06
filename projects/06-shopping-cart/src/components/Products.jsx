import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from '../components/Icons.jsx';
import { useCart } from '../hooks/useCart.js';

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

function Products({ products }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) =>
    cart.some((item) => item.id === product.id);

  return (
    <main className="products">
      <ul>
        {products.map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <span>{upperFirst(product.category)}</span>
              </div>
              <div>
                <button style={{background: isProductInCart ? 'red' : '#09f'}}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Products;
