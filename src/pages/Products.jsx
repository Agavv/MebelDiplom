import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, CircularProgress,
  FormControl, InputLabel, Select, MenuItem,
  Pagination, Chip, Stack, IconButton, Tooltip,
} from '@mui/material';
import { BarChart } from '@mui/icons-material';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductCard from '../components/Products/ProductCard';
import ProductFilters from '../components/Filters/ProductFilters';
import { getProducts, getCategories } from '../services/api';
import { ShopContext } from '../contexts/ShopContext';

const SORT_OPTIONS = [
  { value: 'default',    label: 'По умолчанию' },
  { value: 'price_asc',  label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'name_asc',   label: 'Название: А → Я' },
];

const LIMIT = 12;

export default function Products() {
  const [searchParams]   = useSearchParams();
  const categoryId       = searchParams.get('category');
  const searchQuery      = searchParams.get('search') || '';

  const { comparison, toggleComparison, isInComparison } = useContext(ShopContext);

  const [allProducts,    setAllProducts]    = useState([]);   // все для фильтров
  const [products,       setProducts]       = useState([]);   // после фильтрации
  const [total,          setTotal]          = useState(0);
  const [page,           setPage]           = useState(1);
  const [sort,           setSort]           = useState('default');
  const [loading,        setLoading]        = useState(true);
  const [categoryName,   setCategoryName]   = useState('');
  const [activeFilters,  setActiveFilters]  = useState(null);

  // Имя категории
  useEffect(() => {
    if (!categoryId) { setCategoryName('Все товары'); return; }
    getCategories().then((cats) => {
      let name = '';
      cats.forEach((c) => {
        if (c.id === Number(categoryId)) name = c.name;
        c.subCategories?.forEach((s) => { if (s.id === Number(categoryId)) name = s.name; });
      });
      setCategoryName(name || 'Товары');
    });
  }, [categoryId]);

  // Загрузка всех товаров категории (для фильтров)
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({ categoryId, search: searchQuery, page: 1, limit: 999 });
      const items = data.items ?? data;
      setAllProducts(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [categoryId, searchQuery]);

  useEffect(() => { setPage(1); setActiveFilters(null); }, [categoryId, searchQuery]);
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Применяем фильтры + сортировку на фронте
  useEffect(() => {
    let result = [...allProducts];

    if (activeFilters) {
      const { priceRange, selectedMaterials, inStockOnly } = activeFilters;
      if (priceRange)            result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      if (selectedMaterials?.length) result = result.filter(p => selectedMaterials.includes(p.material));
      if (inStockOnly)           result = result.filter(p => (p.stockQuantity ?? 1) > 0);
    }

    if (sort === 'price_asc')  result.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'name_asc')   result.sort((a, b) => a.name.localeCompare(b.name));

    setTotal(result.length);
    const start = (page - 1) * LIMIT;
    setProducts(result.slice(start, start + LIMIT));
  }, [allProducts, activeFilters, sort, page]);

  const pageCount = Math.ceil(total / LIMIT);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Sidebar />

      <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Заголовок */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>{categoryName}</Typography>
            {searchQuery && (
              <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                <Typography variant="body2" color="text.secondary">Поиск:</Typography>
                <Chip label={searchQuery} size="small" />
              </Stack>
            )}
            {!loading && (
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Найдено: {total}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Иконка сравнения */}
            {comparison.length > 0 && (
              <Tooltip title={`К сравнению (${comparison.length})`}>
                <Chip
                  icon={<BarChart />}
                  label={comparison.length}
                  component="a" href="/comparison"
                  clickable color="primary" variant="outlined"
                />
              </Tooltip>
            )}

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Сортировка</InputLabel>
              <Select value={sort} label="Сортировка" onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPTIONS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Контент: фильтры + товары */}
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>

          {/* Фильтры */}
          {!loading && allProducts.length > 0 && (
            <ProductFilters
              products={allProducts}
              onFilter={(filters) => { setActiveFilters(filters); setPage(1); }}
              onReset={() => { setActiveFilters(null); setPage(1); }}
            />
          )}

          {/* Сетка товаров */}
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
              </Box>
            ) : products.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6" color="text.secondary">Товары не найдены</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Попробуйте изменить фильтры или выбрать другую категорию
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.images?.[0] || product.image}
                        images={product.images}
                        material={product.material}
                        description={product.description}
                        categoryId={product.categoryId}
                        // Сравнение
                        inComparison={isInComparison(product.id)}
                        onToggleComparison={() => toggleComparison(product)}
                      />
                    </Grid>
                  ))}
                </Grid>

                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Pagination
                      count={pageCount} page={page}
                      onChange={(_, v) => { setPage(v); window.scrollTo(0, 0); }}
                      color="primary" size="large"
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
