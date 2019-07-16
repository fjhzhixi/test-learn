// 使用监听页面的Ajax请求拦截页面请求的图片

const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 允许请求中断
    await page.setRequestInterception(true);
    // 注册请求监听事件
    page.on('request', request => {
        if (request.resourceType() === 'image') {
            request.abort();
        }
        else {
            request.continue();
        }
    });
    // 打开网页
    await page.goto("https://image.baidu.com/")
    await page.screenshot({path : "../out/demo2.png", fullPage : true});
    await browser.close();
})();