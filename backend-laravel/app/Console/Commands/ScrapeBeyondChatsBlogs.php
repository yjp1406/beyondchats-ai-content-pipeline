<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape oldest BeyondChats blog articles with correct content extraction';

    public function handle()
    {
        $client = new Client([
            'timeout' => 15,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (compatible; BeyondChatsScraper/1.0)',
            ],
        ]);

        $this->info('Fetching BeyondChats blog index…');

        // Step 1: Collect article URLs from first few pages
        $articleLinks = collect();

        for ($page = 1; $page <= 5; $page++) {
            $url = $page === 1
                ? 'https://beyondchats.com/blogs/'
                : "https://beyondchats.com/blogs/page/{$page}/";

            try {
                $html = (string) $client->get($url)->getBody();
            } catch (\Exception $e) {
                continue;
            }

            $crawler = new Crawler($html);

            $crawler->filter('a[href^="https://beyondchats.com/blogs/"]')
                ->each(function ($node) use (&$articleLinks) {
                    $href = $node->attr('href');

                    if (
                        !str_contains($href, '/tag/') &&
                        !str_contains($href, '/category/') &&
                        !str_contains($href, '/page/')
                    ) {
                        $articleLinks->push($href);
                    }
                });

            if ($articleLinks->unique()->count() >= 6) {
                break;
            }
        }

        $articleLinks = $articleLinks->unique()->take(6);

        // Step 2: Scrape each article
        foreach ($articleLinks as $url) {

            if (Article::where('source_url', $url)->exists()) {
                continue;
            }

            $this->info("Scraping article: {$url}");

            try {
                $html = (string) $client->get($url)->getBody();
            } catch (\Exception $e) {
                $this->warn("Failed to fetch article: {$url}");
                continue;
            }

            $crawler = new Crawler($html);

            // Title (always present)
            if (!$crawler->filter('h1')->count()) {
                $this->warn("No title found, skipping: {$url}");
                continue;
            }

            $title = trim($crawler->filter('h1')->first()->text());

            /**
             * ✅ CORRECT CONTENT EXTRACTION
             * We explicitly collect paragraph text from the main content area.
             */
            $contentParts = [];

            $crawler->filter('div p')->each(function ($node) use (&$contentParts) {
                $text = trim($node->text());
                if (strlen($text) > 40) { // ignore tiny UI text
                    $contentParts[] = $text;
                }
            });

            if (count($contentParts) < 3) {
                $this->warn("Insufficient content extracted, skipping: {$url}");
                continue;
            }

            $content = implode("\n\n", $contentParts);

            Article::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'content' => $content,
                'source_url' => $url,
                'version' => 'original',
            ]);
        }

        $this->info('Scraping completed successfully.');
    }
}
