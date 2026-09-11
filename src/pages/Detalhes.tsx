import { Link, useParams } from "react-router-dom";
import { productDetails } from "./detalhes do produto";
import { useCart } from "../context/CartContext.ts";

export default function Detalhes() {
	const { id } = useParams();
	const product = productDetails.find((item) => item.id === Number(id));
	const { cartItems, addToCart } = useCart();
	const isAddedToCart = product ? cartItems.some((item) => item.id === product.id) : false;

	if (!product) {
		return (
			<main className="product-details-page">
				<p className="products-feedback products-error">Produto não encontrado.</p>
				<Link className="back-link" to="/produtos">
					Voltar para produtos
				</Link>
			</main>
		);
	}

	return (
		<main className="product-details-page">
			<Link className="back-link" to="/produtos">
				Voltar para produtos
			</Link>
			<article className="product-details-card">
				<div className="product-details-image-wrap">
					<img src={product.image} alt={product.title} className="product-details-image" />
				</div>
				<div className="product-details-content">
					<p className="products-eyebrow">{product.category}</p>
					<h1>{product.title}</h1>
					<p className="product-details-price">${product.price.toFixed(2)}</p>
					<p className="product-details-description">{product.description}</p>
					<p className="product-details-rating">
						Avaliação: {product.rating.rate} de 5 ({product.rating.count} avaliações)
					</p>
					<button
						type="button"
						className="cart-button details-cart-button"
						onClick={() => addToCart(product)}
						disabled={isAddedToCart}
					>
						{isAddedToCart ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
					</button>
				</div>
			</article>
		</main>
	);
}
