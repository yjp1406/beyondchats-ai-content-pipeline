<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\ScrapeBeyondChatsBlogs::class,
    ];

    protected function schedule($schedule): void {}

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
    }
}
