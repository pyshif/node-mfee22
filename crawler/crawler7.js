// 內建
const fs = require('fs/promises');
const path = require('path');
// 第三方
const moment = require('moment');
const mysql = require('mysql2');
require('dotenv').config();
// 自己
const twse = require('./utils/twse');
const converter = require('./utils/converter');
const twseSaver = require('./utils/twseSaver');
const conn = require('./utils/db');
const dbSaver = require('./utils/dbSaver');

(async () => {
    try {
        // 讀取檔案（股票代碼）
        // let stockNo = await fs.readFile('./stock.txt', 'utf-8');
        let stockNo = await fs.readFile(
            path.join(__dirname, './stock.txt'),
            'utf-8'
        );
        // console.log(stockNo);

        const codeQuery = await twse.queryStockName(stockNo);
        // console.log(codeQuery);

        if (codeQuery instanceof Error) {
            return;
        }

        let stockName = converter.parseStockName(codeQuery);
        // console.log(stockName);

        // 儲存股票代碼與名稱進資料庫
        // Using prepared statements
        // to protect from SQL Injection attacks
        let insertStockName = await twseSaver.saveStockName(
            conn,
            stockNo,
            stockName
        );
        // console.log(insertStockName);

        let stockPrice = await twse.queryStockPrice(stockNo);
        // console.log(stockPrice);

        // 資料格式轉換
        let transferData = converter.convertPrice(stockNo, stockPrice);
        // console.log([transferData]);

        // 儲存進資料庫
        // console.log('insert data');
        dbSaver.insert(transferData);
    } catch (e) {
        console.error('err :>>', e);
    }
    conn.end();
})();
