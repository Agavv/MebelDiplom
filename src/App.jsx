import './index.css'; // Важно!
import Header from './components/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Добро пожаловать в каталог!</h2>
        <p>Теперь шапка выглядит как надо.</p>
      </main>
    </div>
  );
}

export default App;