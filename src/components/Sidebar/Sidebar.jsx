import React, { useState } from 'react';
import './Sidebar.css';

const categories = [
  { id: 1, name: 'Комоды и тумбы', icon: '🗄️', subCategories: ['Прикроватные тумбы', 'Комоды для спальни'] },
  { id: 2, name: 'Мебель для детской', icon: '🧸', subCategories: ['Детские кровати', 'Столы для учебы'] },
  { id: 3, name: 'Мебель для кухни', icon: '🍳', subCategories: ['Кухонные гарнитуры', 'Столы'] },
];

const Sidebar = () => {
  const [openIds, setOpenIds] = useState([]);

  const toggleCategory = (id) => {
    setOpenIds((prevIds) => 
      prevIds.includes(id) 
        ? prevIds.filter(itemId => itemId !== id)
        : [...prevIds, id]
    );
  };

  return (
    <aside className="catalog-sidebar">
      <div className="sidebar-title">Каталог мебели</div>
      <ul className="sidebar-menu">
        {categories.map((cat) => {
          const isOpen = openIds.includes(cat.id);
          return (
            <li key={cat.id} className="menu-container">
              <div 
                className={`menu-item ${isOpen ? 'active' : ''}`} 
                onClick={() => toggleCategory(cat.id)}
              >
                <div className="menu-item-content">
                  <span className="menu-icon">{cat.icon}</span>
                  <span className="menu-label">{cat.name}</span>
                </div>
                {cat.subCategories && (
                  <span className={`menu-arrow ${isOpen ? 'rotated' : ''}`}>›</span>
                )}
              </div>

              {isOpen && cat.subCategories && (
                <ul className="subcategory-list">
                  {cat.subCategories.map((sub, index) => (
                    <li key={index} className="subcategory-item">{sub}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;