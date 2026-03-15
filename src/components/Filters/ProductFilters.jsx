import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Slider, Checkbox, FormControlLabel,
  TextField, Button, Divider, Collapse, IconButton,
  Chip, Stack,
} from '@mui/material';
import { ExpandMore, ExpandLess, FilterAltOff } from '@mui/icons-material';

// Собирает уникальные значения из товаров
const extractFilterOptions = (products) => {
  const materials = [...new Set(products.map(p => p.material).filter(Boolean))].sort();
  const prices    = products.map(p => p.price);
  const minPrice  = prices.length ? Math.min(...prices) : 0;
  const maxPrice  = prices.length ? Math.max(...prices) : 200000;
  return { materials, minPrice, maxPrice };
};

export default function ProductFilters({ products, onFilter, onReset }) {
  const { materials, minPrice, maxPrice } = extractFilterOptions(products);

  const [priceRange,       setPriceRange]       = useState([minPrice, maxPrice]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [inStockOnly,      setInStockOnly]       = useState(false);
  const [openSections,     setOpenSections]      = useState({ price: true, material: true, stock: true });

  // Пересчитываем диапазон если товары изменились
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const toggleSection = (key) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  // Считаем количество активных фильтров
  const activeCount =
    (selectedMaterials.length > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0);

  // Применяем фильтры
  useEffect(() => {
    onFilter({ priceRange, selectedMaterials, inStockOnly });
  }, [priceRange, selectedMaterials, inStockOnly]);

  const handleReset = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedMaterials([]);
    setInStockOnly(false);
    onReset?.();
  };

  return (
    <Box sx={{ width: 240, flexShrink: 0 }}>
      {/* Заголовок фильтров */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography fontWeight={700} fontSize="1rem">
          Фильтры
          {activeCount > 0 && (
            <Chip label={activeCount} size="small" color="primary" sx={{ ml: 1, height: 18, fontSize: '11px' }} />
          )}
        </Typography>
        {activeCount > 0 && (
          <IconButton size="small" onClick={handleReset} title="Сбросить всё" sx={{ color: 'text.secondary' }}>
            <FilterAltOff fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* ── Цена ── */}
      <Box sx={{ mb: 1 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 0.5 }}
          onClick={() => toggleSection('price')}
        >
          <Typography fontWeight={600} fontSize="0.9rem">Цена, ₽</Typography>
          {openSections.price ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </Box>
        <Collapse in={openSections.price}>
          <Box sx={{ px: 1, pb: 1 }}>
            <Slider
              value={priceRange}
              onChange={(_, v) => setPriceRange(v)}
              min={minPrice} max={maxPrice} step={500}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v.toLocaleString()} ₽`}
              sx={{ color: '#1976d2' }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small" type="number" label="От"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                inputProps={{ min: minPrice, max: priceRange[1] }}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small" type="number" label="До"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                inputProps={{ min: priceRange[0], max: maxPrice }}
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* ── Материал ── */}
      {materials.length > 0 && (
        <>
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 0.5 }}
              onClick={() => toggleSection('material')}
            >
              <Typography fontWeight={600} fontSize="0.9rem">Материал</Typography>
              {openSections.material ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Box>
            <Collapse in={openSections.material}>
              <Stack spacing={0}>
                {materials.map(mat => (
                  <FormControlLabel
                    key={mat}
                    control={
                      <Checkbox
                        size="small" checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        sx={{ py: 0.5 }}
                      />
                    }
                    label={<Typography fontSize="0.85rem">{mat}</Typography>}
                  />
                ))}
              </Stack>
              {selectedMaterials.length > 0 && (
                <Button size="small" onClick={() => setSelectedMaterials([])} sx={{ mt: 0.5, fontSize: '0.75rem' }}>
                  Сбросить
                </Button>
              )}
            </Collapse>
          </Box>
          <Divider sx={{ my: 1 }} />
        </>
      )}

      {/* ── Наличие ── */}
      <Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 0.5 }}
          onClick={() => toggleSection('stock')}
        >
          <Typography fontWeight={600} fontSize="0.9rem">Наличие</Typography>
          {openSections.stock ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </Box>
        <Collapse in={openSections.stock}>
          <FormControlLabel
            control={
              <Checkbox
                size="small" checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                sx={{ py: 0.5 }}
              />
            }
            label={<Typography fontSize="0.85rem">Только в наличии</Typography>}
          />
        </Collapse>
      </Box>
    </Box>
  );
}
