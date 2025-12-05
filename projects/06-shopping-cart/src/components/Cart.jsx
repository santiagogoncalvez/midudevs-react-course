import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons';
import './Cart.css';

function Cart() {
  const cartCheckboxId = useId();

  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          <li>
            <img
              src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
              alt="Essence Mascara Lash Princess"
            />

            <div>
              <strong>Essence Mascara Lash Princess</strong> - $9.99
            </div>

            <footer>
              <small>Qty: 1</small>
              <button>1</button>
            </footer>
          </li>
        </ul>

        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}

export default Cart;
