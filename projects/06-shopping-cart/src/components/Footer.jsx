// import { useFilters } from '../hooks/useFilters';y
import { useCart } from '../hooks/useCart.js';
import './Footer.css';

function Footer() {
  // const { filters } = useFilters();
  const { cart } = useCart();

  return (
    <footer className="footer">
      <h4>
        Prueba técnica de React ⚛️ － <span>@midudev</span>
      </h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  );
}

export default Footer;
