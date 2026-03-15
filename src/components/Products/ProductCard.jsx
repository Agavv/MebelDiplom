import { useContext } from "react";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { ShopContext } from "../../contexts/ShopContext";
import "./ProductCard.css";

export default function ProductCard(props) {
  const { 
    id, 
    name, 
    price, 
    image, 
    material, 
    ...productData 
  } = props;

  const { 
    openProductModal, 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    getQuantity, 
    updateQuantity 
  } = useContext(ShopContext);

  const favorited = isFavorite(id);
  const quantity = getQuantity(id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, material, ...productData });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ id, name, price, image, material, ...productData });
  };

  return (
    <div className="product-card">
      <div 
        className="product-image-link" 
        onClick={() => openProductModal({ id, name, price, image, material, ...productData })}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={image || productData.images?.[0]} 
          alt={name} 
        />
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p className="material">{material}</p>
        
        <div className="price-row">
          <span className="price">{price.toLocaleString()} ₽</span>
        </div>

        <div className="actions">
          {/* Избранное */}
          <button 
            className="favorite-btn" 
            title="В избранное"
            onClick={handleToggleFavorite}
          >
            {favorited ? 
              <Favorite sx={{ color: '#d32f2f' }} /> : 
              <FavoriteBorder />
            }
          </button>

          {/* Корзина с счётчиком */}
          {quantity > 0 ? (
            <div className="cart-counter">
              <button onClick={() => updateQuantity(id, quantity - 1)} className="counter-btn">−</button>
              <span className="counter-value">{quantity}</span>
              <button onClick={() => updateQuantity(id, quantity + 1)} className="counter-btn">+</button>
            </div>
          ) : (
            <button className="cart-btn" onClick={handleAddToCart}>
              <AddShoppingCart />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}