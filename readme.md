web测试框架的简单demo学习

## selenium-webdriver

1. 使用模板

   ```javascript
   let driver =await new Builder().forBrowser("chrome").build(); //获得chrome浏览器的driver
   await driver.get(url);	//访问url
   ```

2. 常用`API`

   1. 等待页面加载 : 

      显式的等待页面中的某些元素加载成功之后再进行下一步

      ```javascript
      /*
       1.等待condition条件为真之后进行下一步
       2.最大等待时间不超过timeout
      */
      await driver.wait(condition, timeout);
      // 例子如下
      // 等待该页面标题为 webdriver - Google 搜索
      await driver.wait(until.titleIs("webdriver - Google 搜索"), 10000);
      // 等待该页面中找到HTML元素 id = foo
      await driver.wait(until.elementLocated(By.id('foo')), 10000);
      // until库中有众多封装好的condition对象可以使用
      ```

   2. **定位页面元素**

      ```JavaScript
      // locator为页面元素大的定位器
      await driver.findElement( locator )
      // 例子如下
      await driver.findElement(By.name("q"))	//定位name为q的HTML元素
      await driver.findElement(By.css())	//使用CSS定位器
      await driver.findElement(By.xpath())	//使用Xpath定位
      // By库中有众多封装好的定位HTML元素的locator
      ```

   3. 操作页面元素

      ```javascript
      //找到搜索框输入搜素词
      //在input的HTML元素上可以使用sendKeys方法,其中Key库中封装一些特殊键盘按键
      await driver.findElement(By.name("q")).sendKeys('webdriver', Key.RETURN);
      //在当前元素或当前元素的父元素有form时提交表单
      await driver.submit()
      //Class WebElement 中封装了可以对DOM节点元素进行操作的方法
      ```

## puppeteer
1. 使用模板

   ```javascript
    const browser = await puppeteer.launch();	//获得无头浏览器
    const page = await browser.newPage();	//在该浏览器中新建一个tab page页
    await page.goto(url);	//访问url
   ```

2. 常用`API`

   1. 等待页面加载

      ```javascript
      await page.waitFor(selector);
      ```

   2. 定位元素

      ```javascript
      //使用CSS选取器从DOM树中选择DOM节点
      const searchValue = await page.$eval('#search', el => el.value);
      const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
      const html = await page.$eval('.main-container', e => e.outerHTML);
      ```

   3. 操作方法

      ```javascript
      // 截屏
      await page.screenshot({path : "../out/demo1.png"});
      // 保存为pdf
      await page.pdf({path : "../out/demo1.pdf", format : "A4"});
      ```

   4. **监控方法**

      ```javascript
      // 比如监控页面请求
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
      // 为页面window对象绑定自定义方法 使用page.exposeFunction
      	await page.exposeFunction("functionName", paras => {
              return paras;
          });
      // 调用页面window对象方法 使用page.evaluate(fucnt) : 执行传入的方法
      	await page.evaluate(async () => {
              // to do window.functionName()
          });
      ```

      