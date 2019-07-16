// 在findElement中的定位函数可以自定义
/*
要求:
1.以driver实例为传入参数
2.返回值为WebElement类型或者resolve之后为WebElement的Promise对象
 */
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {Builder, By, Key, until} = require("selenium-webdriver");
const option = new chrome.Options();
option.headless();
const promise = require("selenium-webdriver/lib/promise")
//获取页面所有的可见的link
function firstVisibleLink(driver) {
    // 获得所有的链接
    var links = driver.findElements(By.css("a"));
    // 使用filters过滤集合
    return promise.filter(links, function (link) {
        return link.isDisplayed();
    });
}

(async function demo2() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(option).build();
    try {
        await driver.get("https://www.baidu.com/");
        // 获取页面搜素框并输入关键词搜索
        await driver.findElement(By.id("kw")).sendKeys('webdriver', Key.RETURN);
        // 检查返回页面
        await driver.wait(until.titleIs("webdriver_百度搜索"), 1000);
        // 获取可见的链接元素
        var visibleLinks = await driver.findElements(firstVisibleLink);
        console.log(visibleLinks);
    } finally {
        await driver.quit();
    }
})();