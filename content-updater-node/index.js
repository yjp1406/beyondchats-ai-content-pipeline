import 'dotenv/config';
import axios from 'axios';
import { searchGoogle } from './googleSearch.js';
import { scrapeArticle } from './scrapeArticle.js';
import { rewriteWithLLM } from './llmRewrite.js';
import { publishArticle } from './publish.js';

const API = process.env.LARAVEL_API_BASE;

async function run() {
  console.log('Fetching latest article from Laravel...');

  const { data: articles } = await axios.get(`${API}/articles`);
  const latest = articles[0];

  if (!latest) {
    console.log('No articles found');
    return;
  }

  console.log(`Title: ${latest.title}`);

  const links = await searchGoogle(latest.title);

  const referenceContents = [];
  for (const link of links) {
    const content = await scrapeArticle(link);
    if (content) referenceContents.push({ link, content });
  }

  const updatedContent = await rewriteWithLLM(
    latest.content,
    referenceContents
  );

  await publishArticle(latest.title, updatedContent, links);

  console.log('Updated article published successfully.');
}

run().catch(console.error);
