import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { mockProducts } from "../data/mockProducts";
import { mockCategories } from "../data/mockCategories";
import ProductCard from "../components/Products/ProductCard";
import { Box, TextField, Select, MenuItem, Button, Typography, Stack } from "@mui/material";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = parseInt(searchParams.get("category"));

  // === ФИЛЬТРЫ ===
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  // Умный фильтр по категории (как раньше)
  let baseProducts = mockProducts;
  if (categoryId) {
    const category = mockCategories.find(cat => cat.id === categoryId);
    if (category) {
      const allowedIds = [category.id, ...(category.subCategories?.map(s => s.id) || [])];
      baseProducts = mockProducts.filter(p => allowedIds.includes(p.categoryId));
    } else {
      baseProducts = mockProducts.filter(p => p.categoryId === categoryId);
    }
  }

  // Применяем фильтры и сортировку
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Фильтр по цене
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));

    // Фильтр по материалу
    if (materialFilter) result = result.filter(p => p.material === materialFilter);

    // Сортировка
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [baseProducts, minPrice, maxPrice, materialFilter, sortBy]);

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMaterialFilter("");
    setSortBy("price-asc");
  };

  // Уникальные материалы для селекта
  const uniqueMaterials = [...new Set(mockProducts.map(p => p.material))];

  return (
    <Box sx={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {categoryId ? `Товары по категории` : "Все товары"}
      </Typography>

      {/* ФИЛЬТРЫ */}
      <Box sx={{ mb: 5, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="center">
          <TextField 
            label="Цена от" 
            type="number" 
            value={minPrice} 
            onChange={e => setMinPrice(e.target.value)} 
            size="small"
            sx={{ width: 140 }}
          />
          <TextField 
            label="Цена до" 
            type="number" 
            value={maxPrice} 
            onChange={e => setMaxPrice(e.target.value)} 
            size="small"
            sx={{ width: 140 }}
          />

          <Select 
            value={materialFilter} 
            onChange={e => setMaterialFilter(e.target.value)}
            displayEmpty 
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Все материалы</MenuItem>
            {uniqueMaterials.map(mat => (
              <MenuItem key={mat} value={mat}>{mat}</MenuItem>
            ))}
          </Select>

          <Select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)} 
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="price-asc">Сначала дешёвые</MenuItem>
            <MenuItem value="price-desc">Сначала дорогие</MenuItem>
            <MenuItem value="name">По названию</MenuItem>
          </Select>

          <Button variant="outlined" onClick={resetFilters}>
            Сбросить фильтры
          </Button>
        </Stack>
      </Box>

      {/* ТОВАРЫ */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', mt: 5 }}>
            Ничего не найдено по выбранным фильтрам
          </Typography>
        )}
      </div>
    </Box>
  );
}