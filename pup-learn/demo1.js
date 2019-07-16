const puppeteer = require("puppeteer");

// 使用puppeteer产生快照

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com/");
    await page.screenshot({path : "../out/demo1.png"});
    await page.pdf({path : "../out/demo1.pdf", format : "A4"});
    await browser.close();
})();
