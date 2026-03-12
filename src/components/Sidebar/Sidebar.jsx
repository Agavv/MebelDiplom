import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { mockCategories } from "../../data/mockCategories";   // ← добавил
import './Sidebar.css';

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
        {mockCategories.map((category) => {   // ← теперь из mock
          const isOpen = openIds.includes(category.id);
          const hasSubs = category.subCategories && category.subCategories.length > 0;

          return (
            <li key={category.id} className="menu-container">
              <div 
                className={`menu-item ${isOpen ? 'active' : ''}`} 
                onClick={() => toggleCategory(category.id)}
              >
                <div className="menu-item-wrapper">
                  <div className="menu-item-content">
                    <span className="menu-icon">{category.icon}</span>
                    <Link 
                      to={`/products?category=${category.id}`}
                      className="menu-label"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      {category.name}
                    </Link>
                  </div>
                  
                  {hasSubs && (
                    <span className={`menu-arrow ${isOpen ? 'rotated' : ''}`}>
                      ›
                    </span>
                  )}
                </div>
              </div>

              {isOpen && hasSubs && (
                <ul className="subcategory-list">
                  {category.subCategories.map((sub) => (
                    <li key={sub.id} className="subcategory-item">
                      <Link 
                        to={`/products?category=${sub.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sub.name}
                      </Link>
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