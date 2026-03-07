import './index.css'; // Важно!
import Header from './components/Header/Header'; // Как он там у тебя называется
import Sidebar from './components/Sidebar/Sidebar';
import CategoriesGrid from './components/Categories/CategoriesGrid';

function App() {
  return (
    <div className="app-container" style={{ width: '100%' }}>
      <Header /> 
      
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

            <CategoriesGrid/>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;