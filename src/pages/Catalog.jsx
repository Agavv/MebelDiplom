import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import CategoriesGrid from '../components/Categories/CategoriesGrid';

export default function Catalog() {
  return (
    <div className="main-layout" style={{ 
      display: 'flex', 
      width: '100%', 
      gap: '5px',
      padding: '50px',
      marginTop: '1px',
    }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <div className="content">
          <h1>Официальный интернет-магазин мебели BestMebel</h1>
          <CategoriesGrid />
        </div>
      </main>
    </div>
  );
}