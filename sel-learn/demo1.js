const {Builder, By, Key, until} = require("selenium-webdriver");

(async function demo1() {
    // 建立Chrom浏览器的driver
    let driver =await new Builder().forBrowser("chrome").build();
    // 访问网址
    try {
        await driver.get("https://www.google.com/");
        // 获取页面搜素框并输入关键词搜索
        await driver.findElement(By.name("q")).sendKeys('webdriver', Key.RETURN);
        // 检查返回页面
        await driver.wait(until.titleIs("webdriver - Google 搜索"), 1000);
    } finally {
        await driver.quit();
    }
})();