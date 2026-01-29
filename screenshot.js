const puppeteer = require('puppeteer');
const http = require('http');

(async () => {
    // 启动 HTTP 服务器
    const server = http.createServer((req, res) => {
        const fs = require('fs');
        let filePath = '.' + req.url;
        if (filePath === './') filePath = './index.html';
        
        const extname = String(filePath.split('.').pop()).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
        };
        
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        
        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });
    
    const port = 8081;
    server.listen(port, async () => {
        console.log(`服务器运行在 http://localhost:${port}`);
        
        // 启动浏览器
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // 设置视口大小
        await page.setViewport({ width: 1920, height: 1080 });
        
        try {
            // 1. 截图主菜单
            console.log('截图主菜单...');
            await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: 'assets/images/menu.png' });
            
            // 2. 选择职业并开始游戏
            console.log('开始游戏...');
            await page.waitForSelector('button.menu-btn');
            await page.click('button.menu-btn:first-child'); // 点击剑客
            
            // 等待战斗界面加载
            await page.waitForSelector('.battle-screen', { timeout: 5000 });
            await page.screenshot({ path: 'assets/images/battle-1.png' });
            console.log('截图战斗界面 1...');
            
            // 3. 模拟使用一张卡牌
            console.log('使用卡牌...');
            await page.waitForSelector('.card:not(.disabled)', { timeout: 5000 });
            await page.click('.card:not(.disabled):first-child');
            await page.screenshot({ path: 'assets/images/battle-2.png' });
            console.log('截图战斗界面 2...');
            
            // 4. 结束回合
            console.log('结束回合...');
            await page.click('#endTurnBtn');
            await page.waitForTimeout(1000);
            await page.screenshot({ path: 'assets/images/battle-3.png' });
            console.log('截图战斗界面 3...');
            
            console.log('所有截图完成！');
            
        } catch (error) {
            console.error('截图过程中出错:', error);
        } finally {
            await browser.close();
            server.close();
        }
    });
})();
