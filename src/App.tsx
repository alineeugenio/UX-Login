import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Detalhes from "./pages/Detalhes";
import { getProducts, type Product } from "./api/products";
import "./App.css";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch {
        setErrorMessage("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="products-page">
      <header className="products-header">
        <div>
          <p className="products-eyebrow">Fake Store</p>
          <h1>Produtos</h1>
          <p>Encontre o que combina com você.</p>
        </div>
        <Link className="back-link" to="/">
          Voltar para o login
        </Link>
      </header>

      {isLoading && <p className="products-feedback">Carregando produtos...</p>}
      {errorMessage && <p className="products-feedback products-error">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <section className="products-grid" aria-label="Lista de produtos">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <Link to={`/produtos/${product.id}`} aria-label={`Ver detalhes de ${product.title}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`product-image ${product.id === 5 ? "product-image-bracelet" : ""}`}
                  />
                </Link>
              </div>
              <div className="product-card-content">
                <h2>{product.title}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/produtos" element={<ProductsPage />} />
      <Route path="/produtos/:id" element={<Detalhes />} />
    </Routes>
  );
}
