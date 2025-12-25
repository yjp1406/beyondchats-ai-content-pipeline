import axios from 'axios';
import { load } from 'cheerio';

export async function scrapeArticle(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000,
    });

    const $ = load(data);
    const paragraphs = [];

    $('p').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 60) {
        paragraphs.push(text);
      }
    });

    return paragraphs.join('\n\n');
  } catch (e) {
    console.warn(`Failed to scrape ${url}`);
    return null;
  }
}
