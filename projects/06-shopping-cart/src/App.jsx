import Products from './components/Products';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/cart.jsx';
import { IS_DEVELOPMENT } from './config.js';
import { useFilters } from './hooks/useFilters.js';
import { CartProvider } from './context/cart.jsx';
import { useProducts } from './hooks/useProducts.js';

function App() {
  const { products } = useProducts();
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;
