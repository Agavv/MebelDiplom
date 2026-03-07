import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ title, price, image, categoryId }) {
  return (
    <Link to={`/catalog?category=${categoryId}`} className="category-card">

      <img src={image} alt={title} />

      <div className="category-card-info">
        <h3>{title}</h3>
        <span>от {price} ₽</span>
      </div>

    </Link>
  );
}