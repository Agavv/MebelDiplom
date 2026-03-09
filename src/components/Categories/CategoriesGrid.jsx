import CategoryCard from "./CategoryCard";
import "./CategoriesGrid.css";

export default function CategoriesGrid() {
  const categories = [
    {
      id: 1,
      title: "Комоды и тумбы",
      price: 6900,
      image: "src/assets/images/KomodAndTumba.jpg"
    },
    {
      id: 2,
      title: "Мебель для детской",
      price: 5400,
      image: "src/assets/images/detskayKomnata1.jpg"
    },
    {
      id: 3,
      title: "Мебель для кухни",
      price: 12900,
      image: "src/assets/images/detskayKomnata2.jpg"
    },
    {
      id: 4,
      title: "Мебель для офиса",
      price: 9900,
      image: "src/assets/images/divanTkaneviySeriy.jpg"
    }
  ];

  return (
    <div className="categories-grid">
      {categories.map(cat => (
        <CategoryCard
          key={cat.id}
          categoryId={cat.id}
          title={cat.title}
          price={cat.price}
          image={cat.image}
        />
      ))}
    </div>
  );
}