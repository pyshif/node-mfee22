const express = require('express');
const path = require('path');
const http = require('http');
require('dotenv').config();

// express 物件
// console.log('express', express);

// express 包著建構式？ app1 不等於 app2 表示 express 包著建構式？
// const app1 = express();
// const app2 = express();
// console.log('app1 === app2 :>> ', app1 === app2); // false

// app 物件
const app = express();
// console.log('app', app);

// 建立 views 視圖
app.set('views', path.join(__dirname, 'views'));
// 要用哪一種 template engine
app.set('view engine', 'pug');

// express 可以做 SSR 也可以做 CSR
// 使用 express 內建的中間件
// path 是 nodejs 內建的 library (不同作業系統根目錄路徑不一樣，path.join 會幫我們處理)
// assets/ 一般來說是放網站中的靜態檔案：img, css, js, html...
// 第一個參數放 URL 的請求中要有包含的路徑 (實際檔案路徑中可以不需要包含)
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// 中間件是執行時會被放入 stack 中？
// 如果中間件中要處理異步任務，是不是要將傳入 callback 設成 async 來確保執行完才 next()？
// 是否有辦法讓一個異步任務在不同的中間件中被處理？(一個發送、一個接收)

// regular middleware 一般中間件用 use
app.use(async function (req, res, next) {
    const current = new Date();
    // console.log('[info][timestamp][module name] message :>> ', [info][timestamp][module name] message);
    console.log(`有人來辦訪 at ${current.toISOString}`);
    next();
    console.log('This is stack 1');
});

app.use(function (req, res, next) {
    console.log('這是一個沒有用的中間件');
    next();
    console.log('This is stack 2');
});

// router middleware
// 路由中間件有時候 next 不寫，因為用途上通常已經是終點不需要 next
app.get('/', function (req, res, next) {
    console.log('拜訪首頁');
    // 純文字
    // res.send('Hello Express');
    // server side render
    res.render('index', {
        stocks: ['台積電', '長榮', '聯發科'],
    });
    console.log('This is stack 3');
});

app.get('/about', function (req, res, next) {
    console.log('這是關於我們');
    res.send('我們是 MFEE22');
});

app.get('/contact', function (req, res, next) {
    console.log('有人訪問聯絡我');
    // throw new Error('故意製造的錯誤');
    res.send('這是聯絡我們');
});

app.use(function (req, res, next) {
    console.log('這是一個在首頁後的中間件');
    next();
});

app.use(function (err, req, res, next) {
    console.log('錯誤處理中間件');
    res.status(500).send('Server 錯誤：請洽系統管理員');
});

// env 資料
const port = process.env.SERVER_PORT || 3000;

// 建立一個監聽程序
// 返回一個 http.Server 物件
// app.listen 經測試是一個異步執行的方法(將 awiat 拿掉 that 無法捕捉到 this)
// app.listen 的 callback 函數中的 this 值就是 app.listen 的返回值(一個 http.Server 物件)
(async function () {
    let that = null;
    const server = await app.listen(port, function () {
        // console.log('this :>> ', this); // http.Server 物件？
        that = this;
        console.log(`Server running at port ${port}`);
    });
    // 捕捉 callback 中的 this 和 server 比對
    // console.log('that :>> ', that);
    // console.log('server :>> ', server);
    console.log('that === server :>> ', that === server); // true
    console.log(
        'that instanceof http.Server :>> ',
        that instanceof http.Server
    ); // true
})();
