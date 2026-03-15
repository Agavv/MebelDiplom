import { useContext } from "react";
import { AddShoppingCart, Favorite, FavoriteBorder, BarChart } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ShopContext } from "../../contexts/ShopContext";
import "./ProductCard.css";

export default function ProductCard(props) {
  const {
    id, name, price, image, material,
    inComparison, onToggleComparison,
    ...productData
  } = props;

  const {
    openProductModal, addToCart,
    toggleFavorite, isFavorite,
    getQuantity, updateQuantity,
    isInComparison, toggleComparison,
  } = useContext(ShopContext);

  const favorited  = isFavorite(id);
  const quantity   = getQuantity(id);
  const comparing  = inComparison ?? isInComparison(id);

  const product = { id, name, price, image, material, ...productData };

  return (
    <div className="product-card">
      <div
        className="product-image-link"
        onClick={() => openProductModal(product)}
        style={{ cursor: 'pointer' }}
      >
        <img src={image || productData.images?.[0]} alt={name} />
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p className="material">{material}</p>

        <div className="price-row">
          <span className="price">{price.toLocaleString()} ₽</span>
        </div>

        <div className="actions">
          {/* Избранное */}
          <button className="favorite-btn" title="В избранное" onClick={() => toggleFavorite(product)}>
            {favorited
              ? <Favorite sx={{ color: '#d32f2f' }} />
              : <FavoriteBorder />}
          </button>

          {/* Сравнение */}
          <Tooltip title={comparing ? 'Убрать из сравнения' : 'Добавить к сравнению'}>
            <button
              className={`compare-btn${comparing ? ' compare-btn--active' : ''}`}
              onClick={() => onToggleComparison ? onToggleComparison() : toggleComparison(product)}
            >
              <BarChart sx={{ fontSize: 20, color: comparing ? '#1976d2' : undefined }} />
            </button>
          </Tooltip>

          {/* Корзина */}
          {quantity > 0 ? (
            <div className="cart-counter">
              <button onClick={() => updateQuantity(id, quantity - 1)} className="counter-btn">−</button>
              <span className="counter-value">{quantity}</span>
              <button onClick={() => updateQuantity(id, quantity + 1)} className="counter-btn">+</button>
            </div>
          ) : (
            <button className="cart-btn" onClick={() => addToCart(product)}>
              <AddShoppingCart />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
