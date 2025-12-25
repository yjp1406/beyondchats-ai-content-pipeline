export default function ArticleDetail({ article }) {
  if (!article) {
    return <p>Select an article to read</p>;
  }

  return (
    <div style={{ maxWidth: '800px', lineHeight: 1.7 }}>
      {article.version === 'updated' && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            color: '#065f46',
          }}
        >
          This article has been enhanced using AI based on external references.
        </div>
      )}

      <h2>{article.title}</h2>

      {article.content.split('\n\n').map((para, i) => (
        <p key={i} style={{ marginBottom: '16px' }}>
          {para}
        </p>
      ))}

      {article.references?.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h4>References</h4>
          <ul>
            {article.references.map((ref, i) => (
              <li key={i}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#2563eb' }}
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
