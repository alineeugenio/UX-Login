import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.ts";

export default function Carrinho() {
  const { cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, product) => sum + product.price, 0);

  return (
    <main className="cart-page">
      <header className="cart-header">
        <div>
          <p className="products-eyebrow">Fake Store</p>
          <h1>Meu carrinho</h1>
        </div>
        <Link className="back-link" to="/produtos">
          Continuar comprando
        </Link>
      </header>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <p>Seu carrinho está vazio.</p>
          <Link className="cart-button empty-cart-link" to="/produtos">
            Ver produtos
          </Link>
        </section>
      ) : (
        <section className="cart-content">
          <div className="cart-items">
            {cartItems.map((product) => (
              <article className="cart-item" key={product.id}>
                <img src={product.image} alt={product.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h2>{product.title}</h2>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button
                    type="button"
                    className="remove-cart-button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Resumo</h2>
            <p>{cartItems.length} produto(s) selecionado(s)</p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </aside>
        </section>
      )}
    </main>
  );
}
