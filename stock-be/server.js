const express = require('express');
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
