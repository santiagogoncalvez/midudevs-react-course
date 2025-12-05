import './Products.css';
import { AddToCartIcon } from '../components/Icons.jsx';

const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);

function Products({ products }) {
  return (
    <main className="products">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
              <span>{upperFirst(product.category)}</span>
            </div>
            <div>
              <AddToCartIcon />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Products;
