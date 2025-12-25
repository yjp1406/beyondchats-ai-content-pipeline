import { useEffect, useState } from 'react';
import { fetchArticles } from '../api/articles';
import Badge from './Badge';

export default function ArticleList({ onSelect }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div>
      <h2>Articles</h2>

      {articles.map(article => (
        <div
          key={article.id}
          onClick={() => onSelect(article)}
          style={{
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            marginBottom: '12px',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          <h3 style={{ margin: '0 0 6px 0' }}>{article.title}</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge version={article.version} />
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              {new Date(article.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
