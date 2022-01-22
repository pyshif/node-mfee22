const path = require('path');
const express = require('express');
const connection = require('./utils/db');
require('dotenv').config();

// new 一個 app 物件
const app = express();
const port = process.env.SERVER_PORT || 3000;

// 設定 views 視圖 (assign setting 'name' to 'value')
// views, view engine 都是內建變數，分別對應路徑、模板引擎
app.set('views', path.join(__dirname, 'views')); // 預設路徑為 專案根目錄
app.set('view engine', 'pug');

// 靜態檔案服務
// app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './assets')));

// 一般中間件
app.use(function (req, res, next) {
    console.log(`[info][${new Date().toISOString()}] regular middleware`);
    next();
});

// 路由中間件
app.get('/', function (req, res, next) {
    console.log(`[info][${new Date().toISOString()}] / router middleware`);
    // 可傳送 Buffer / String / Boolean / Array
    // res.send('here is / router middleware');
    // 傳送靜態檔案
    // res.sendFile(path.join(__dirname, './public/index.html'));
    // 傳送 JSON (會自動將輸入物件轉為 JSON 格式發送)
    res.json({ path: __dirname, time: new Date() });
    // 可傳送 pug 樣板（參數：名稱, {替代變數}）:>> 須在上方先行設定樣板資料
    // res.render('index', { stocks: ['台積電', '長榮', '聯發科'] });
});

app.get('/api/stocks', async function (req, res, next) {
    // 取得 stocks 表
    // const [rows, fields] = await connection.execute('SELECT * FROM stocks');
    // 取得 stocks_prices 表
    const [rows, fields] = await connection.execute(
        'SELECT * FROM stock_prices'
    );
    // console.log('rows :>> ', rows);
    // console.log('fields :>> ', fields);
    res.json(rows);
});

// 錯誤中間件
app.use(function (err, req, res, next) {
    console.log(`[${err}][${new Date().toISOString()}] ...`);
    res.status(500).send('please contact system manager');
    // next();
});

// 啟動伺服器
app.listen(port, function () {
    console.log('Server running at port', port);
});

// const app = express();
// const port = process.env.SERVER_PORT || 3000;

// // 註冊 router 中間件
// app.get('/api/stocks', async function (req, res, next) {
//     // 觀察輸出，data 在陣列第一個位置
//     // const resl = await connection.execute('SELECT * FROM stocks');
//     // console.log(resl);

//     const [data, fields] = await connection.execute('SELECT * FROM stocks');
//     console.log(data);
//     // res.send :>> 純文字
//     // res.render :>> server-side render 會去找樣板
//     // res.json :>> api 回傳 json 資料
//     res.json(data);
// });

// app.listen(port, function () {
//     console.log(`Server running at port: ${port}`);
// });
