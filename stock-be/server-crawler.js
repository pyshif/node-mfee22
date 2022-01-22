const express = require('express');
const connection = require('./utils/db');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

// 註冊 router 中間件
app.get('/api/stocks', async function (req, res, next) {
    // 觀察輸出，data 在陣列第一個位置
    // const resl = await connection.execute('SELECT * FROM stocks');
    // console.log(resl);

    const [data, fields] = await connection.execute('SELECT * FROM stocks');
    console.log(data);
    // res.send :>> 純文字
    // res.render :>> server-side render 會去找樣板
    // res.json :>> api 回傳 json 資料
    res.json(data);
});

app.listen(port, function () {
    console.log(`Server running at port: ${port}`);
});
