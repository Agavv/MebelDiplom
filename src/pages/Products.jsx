import { useSearchParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import { mockCategories } from "../data/mockCategories";   // ← добавил
import ProductCard from "../components/Products/ProductCard";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = parseInt(searchParams.get("category"));

  // === НОВЫЙ УМНЫЙ ФИЛЬТР ===
  let filteredProducts = mockProducts;

  if (categoryId) {
    const category = mockCategories.find(cat => cat.id === categoryId);
    
    if (category) {
      // Главная категория → показываем все подкатегории + саму себя
      const allowedIds = [category.id];
      if (category.subCategories) {
        allowedIds.push(...category.subCategories.map(sub => sub.id));
      }
      
      filteredProducts = mockProducts.filter(p => 
        allowedIds.includes(p.categoryId)
      );
    } else {
      // Если это подкатегория (например 301)
      filteredProducts = mockProducts.filter(p => p.categoryId === categoryId);
    }
  }

  return (
    <div className="products-page">
      <h1>
        {categoryId 
          ? `Товары по категории ${categoryId}` 
          : "Все товары"}
      </h1>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>Товаров в этой категории пока нет</p>
        )}
      </div>
    </div>
  );
}