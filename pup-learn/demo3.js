// 为page的window对象绑定新的方法
const puppeteer = require("puppeteer");
const crypto = require("crypto");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // 设置浏览器console事件触发时在控制台输出
    page.on("console", msg => console.log(msg.text()));
    // exposeFunction函数为浏览器的window对象绑定自定义的方法
    // 绑定散列计算函数
    await page.exposeFunction("md5", text => {
        return crypto.createHash("md5").update(text).digest('hex');
    });
    // 绑定读取文件函数
    await page.exposeFunction("readFile",async path => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, text) => {
                if (err)
                    reject(err);
                else
                    resolve(text);
            });
        }).then(function (result) {
            return result;
        }).catch(function (err) {
            console.log(err);
        });
    });

    // 使用evaluate()函数触发事件方式
    // evaluate函数执行传入的函数
    // 触发哈希加密函数
    await page.evaluate(async () => {
        const myString = "fjhCaiJi";
        const myHash = await window.md5(myString);
        // 浏览器打印在该控制台也会打印,因为注册了监听
        console.log(`md5 of ${myString} is ${myHash}`);
    });
    // 触发读取文件函数
    await page.evaluate(async () => {
        const mypath = "../file/f1.txt";
        const content = await window.readFile(mypath);
        console.log(content.text());
    });

    await browser.close();

})();
