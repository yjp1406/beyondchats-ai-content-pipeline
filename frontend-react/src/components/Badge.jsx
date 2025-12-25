export default function Badge({ version }) {
  const styles = {
    original: {
      bg: '#2563eb',
      text: 'Original',
    },
    updated: {
      bg: '#16a34a',
      text: 'AI Updated',
    },
  };

  return (
    <span
      style={{
        background: styles[version].bg,
        color: 'white',
        padding: '3px 10px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 500,
      }}
    >
      {styles[version].text}
    </span>
  );
}
