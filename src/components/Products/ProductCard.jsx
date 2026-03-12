import { Link } from "react-router-dom";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ id, name, price, image, material }) {
  const { addToCart, toggleFavorite, isFavorite } = useContext(ShopContext);
  const favorited = isFavorite(id);

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-image-link">
        <img src={image} alt={name} />
      </Link>

      <div className="product-info">
        <h3>{name}</h3>
        <p className="material">{material}</p>
        
        <div className="price-row">
          <span className="price">{price.toLocaleString()} ₽</span>
        </div>

        <div className="actions">
          <button 
            className="favorite-btn" 
            title="В избранное"
            onClick={() => toggleFavorite({ id, name, price, image, material })}
          >
            {favorited ? <Favorite sx={{ color: '#d32f2f' }} /> : <FavoriteBorder />}
          </button>
          
          <button 
            className="cart-btn" 
            title="В корзину"
            onClick={() => addToCart({ id, name, price, image, material })}
          >
            <AddShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}