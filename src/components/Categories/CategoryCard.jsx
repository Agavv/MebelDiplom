import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ title, price, image, categoryId }) {  
  return (
    <Link to={`/products?category=${categoryId}`} className="category-card"> 
      <img src={image} alt={title} />  
      <div className="category-card-info">
        <h3>{title}</h3>
        <span className="category-price">от {price} ₽</span>  
      </div>
    </Link>
  );
}