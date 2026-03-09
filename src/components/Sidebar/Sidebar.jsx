import React, { useState } from 'react';
import './Sidebar.css';

const categories = [
  { 
    id: 1, 
    name: 'Комоды и тумбы', 
    icon: '🗄️', 
    subCategories: [
      { id: 101, name: 'Прикроватные тумбы' },
      { id: 102, name: 'Комоды для спальни' }
    ] 
  },
  { 
    id: 2, 
    name: 'Мебель для детской', 
    icon: '🧸', 
    subCategories: [
      { id: 201, name: 'Детские кровати' },
      { id: 202, name: 'Столы для учебы' }
    ] 
  },
  { 
    id: 3, 
    name: 'Мебель для кухни', 
    icon: '🍳', 
    subCategories: [
      { id: 301, name: 'Кухонные гарнитуры' },
      { id: 302, name: 'Столы' }
    ] 
  },
  { 
    id: 4, 
    name: 'Мебель для офиса', 
    icon: '💼', 
    subCategories: [
      { id: 401, name: 'Офисные столы' },
      { id: 402, name: 'Кресла' }
    ] 
  },
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
    <aside className="sidebar">
      <h3 className="sidebar-title">Каталог мебели</h3>
      <ul className="sidebar-menu">
        {categories.map((category) => {
          const isOpen = openIds.includes(category.id);
          const hasSubs = category.subCategories && category.subCategories.length > 0;

          return (
            <li key={category.id} className="menu-container">
              
              {/* --- Твой новый кусок кода с оберткой --- */}
              <div 
                className={`menu-item ${isOpen ? 'active' : ''}`} 
                onClick={() => toggleCategory(category.id)}
              >
                <div className="menu-item-wrapper">  {/* Новая обертка для flex */}
                  <div className="menu-item-content">
                    <span className="menu-icon">{category.icon}</span>
                    <span 
                      className="menu-label"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Clicked main category: ${category.name}`);
                      }}
                    >
                      {category.name}
                    </span>
                  </div>
                  
                  {hasSubs && (
                    <span className={`menu-arrow ${isOpen ? 'rotated' : ''}`}>
                      ›
                    </span>
                  )}
                </div>
              </div>
              {/* --- Конец нового куска --- */}

              {/* Список подкатегорий */}
              {isOpen && hasSubs && (
                <ul className="subcategory-list">
                  {category.subCategories.map((sub) => (
                    <li 
                      key={sub.id} 
                      className="subcategory-item" 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Clicked subcategory: ${sub.name}`);
                      }}
                    >
                      {sub.name}
                    </li>
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