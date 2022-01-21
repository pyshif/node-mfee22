const fs = require('fs/promises');
const moment = require('moment');
const mysql = require('mysql2');
// const { config } = require('process');
require('dotenv').config();
const twse = require('./utils/twse');
const converter = require('./utils/converter');
const twseSaver = require('./utils/twseSaver');
const conn = require('./utils/db');

(async () => {
    try {
        // 讀取檔案（股票代碼）
        let stockNo = await fs.readFile('./stock.txt', 'utf-8');
        // console.log(stockNo);

        const codeQuery = await twse.queryStockName(stockNo);
        // console.log(codeQuery);

        if (codeQuery instanceof Error) {
            return;
        }

        let stockName = converter.parseStockName(codeQuery);
        console.log(stockName);

        // 儲存股票代碼與名稱進資料庫
        // Using prepared statements
        // to protect from SQL Injection attacks
        let insertStockName = await twseSaver.saveStockName(
            conn,
            stockNo,
            stockName
        );
        console.log(insertStockName);

        let stockPrice = await twse.queryStockPrice(stockNo);
        // console.log(stockPrice);

        // 資料格式轉換
        let transferData = converter.convertPrice(stockNo, stockPrice);
        // console.log(transferData);

        // 儲存進資料庫
        // connection.execute -> 處理 bulk insert 的 prepare statement 會有點小問題
        // 轉換為 promise 物件
        // let insertStockPrices = connection.promise();
        // insertStockPrices.query(
        //     'INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
        //     // 數組包數組？
        //     [transferData]
        // );

        // console.log(insertStockPrices);
    } catch (e) {
        console.error(e);
    }
    db.conn.end();
})();
