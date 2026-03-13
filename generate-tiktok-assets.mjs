import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Where we will save the screenshots
const OUT_DIR = path.join(__dirname, 'public', 'tiktok-assets');
if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const FILES_TO_PROCESS = [
    'public/ideas-prompt-library.html',
    'public/ideas-prompt-library-1.html',
    'public/ideas-prompt-library-2.html',
    'public/ideas-prompt-library-3.html',
    'public/prompt-library.html',
    'public/prompt-library-2.html'
];

(async () => {
    console.log('🎬 Starting TikTok asset generation...');
    console.log(`📂 Saving to: ${OUT_DIR}`);
    
    const browser = await puppeteer.launch({
        headless: "new"
    });
    
    // Create a new page and set a nice wide viewport so cards are rendered at their max width
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });

    let totalSaved = 0;

    for (const file of FILES_TO_PROCESS) {
        const filePath = `file://${path.join(__dirname, file)}`;
        console.log(`\n📄 Processing ${file}...`);
        
        try {
            // Load the local HTML file
            await page.goto(filePath, { waitUntil: 'networkidle0' });

            // Hide the hovering "Buy me a coffee" button for a clean screenshot
            await page.evaluate(() => {
                const btn = document.querySelector('.buy-coffee-btn');
                if (btn) btn.style.display = 'none';
            });

            // Isolate all prompt cards
            const cards = await page.$$('.card');
            console.log(`   Found ${cards.length} cards.`);
            
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                
                // Extract the title to use as the filename
                const title = await card.$eval('.card-title', el => el.textContent.trim())
                    .catch(() => `card_${i + 1}`);
                
                // Clean the title for filesystem use
                const cleanTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const prefix = path.basename(file, '.html');
                const outPath = path.join(OUT_DIR, `${prefix}_${cleanTitle}.png`);
                
                // Screenshot just the specific card element
                await card.screenshot({ path: outPath, omitBackground: true });
                console.log(`   📸 Saved: ${prefix}_${cleanTitle}.png`);
                totalSaved++;
            }
        } catch (error) {
            console.error(`   ❌ Failed to process ${file}:`, error);
        }
    }

    await browser.close();
    console.log(`\n✅ Done! Successfully generated ${totalSaved} TikTok ready assets in ${OUT_DIR}`);
})();
