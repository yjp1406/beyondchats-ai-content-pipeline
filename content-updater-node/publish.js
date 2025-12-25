import axios from 'axios';

export async function publishArticle(title, content, links) {
  await axios.post(`${process.env.LARAVEL_API_BASE}/articles`, {
    title,
    content: `${content}\n\nReferences:\n${links.join('\n')}`,
    version: 'updated',
    references: links,
  });
}
