import { useState } from 'react';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <header
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ margin: 0 }}>BeyondChats Content Dashboard</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Original vs AI-enhanced articles
        </p>
      </header>

      <div style={{ display: 'flex', gap: '32px', padding: '0 24px' }}>
        <div style={{ width: '35%' }}>
          <ArticleList onSelect={setSelected} />
        </div>

        <div style={{ width: '65%' }}>
          <ArticleDetail article={selected} />
        </div>
      </div>
    </>
  );
}
