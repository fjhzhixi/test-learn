// 实现搜索关键词以及收集搜索结果

const puppeteer = require("puppeteer");

(async () => {
    console.log("start");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("goto");
    await page.goto("https://www.baidu.com/");
    // 输入搜索关键词
    console.log("search");
    await page.type("#kw", "Headless Chrome");
    // 输入回车
    await page.click("[type=submit]");
    const resultsSelector = ".result a";
    // 等待结果加载
    await page.waitForSelector(resultsSelector);

    // 获取返回结果
    const results = await page.evaluate(resultsSelector => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        return anchors.map(anchor => {
            const content = anchor.textContent;
            return content;
        });
    }, resultsSelector);
    console.log(results.join("\n"));
    await browser.close();
})();