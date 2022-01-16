const fs = require('fs/promises');
const axios = require('axios');
const moment = require('moment');
const mysql = require('mysql2');
const { config } = require('process');
require('dotenv').config();

(async () => {
    // 資料庫連線
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        // 讀取檔案（股票代碼）
        let stockNo = await fs.readFile('./stock.txt', 'utf-8');
        console.log(stockNo);
        const codeQuery = (
            await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
                params: {
                    query: stockNo,
                },
            })
        ).data;
        // API 回傳資料格式
        // {
        //     "query": "2330",
        //     "suggestions": [
        //         "2330\t台積電",
        //         "2330R\t台積甲",
        //         "2330T\t台積丙"
        //     ]
        // }
        // console.log(codeQuery);
        if (
            !codeQuery.suggestions ||
            codeQuery.suggestions[0].includes('無符合')
        ) {
            throw new Error('查無此表');
        }

        let stockName = codeQuery.suggestions[0].split('\t')[1];
        // console.log(stockName);

        // 儲存股票代碼與名稱進資料庫
        // Using prepared statements
        // to protect from SQL Injection attacks
        let insertStocks = await connection.execute(
            'INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)',
            [stockNo, stockName]
        );
        // console.log(insertStocks);
        let queryDate = moment().format('YYYYMMDD');
        let stock = await axios.get(
            'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            {
                params: {
                    response: 'json',
                    date: queryDate,
                    stockNo,
                },
            }
        );
        // console.log(stock);

        // 資料格式轉換
        let transferData = stock.data.data.map(function (d) {
            // 民國 轉 西元年
            const y = parseInt(d[0].replaceAll('/', '')) + 19110000;
            d[0] = moment(y, 'YYYYMMDD').format('YYYY-MM-DD');
            // 處理千分逗點
            d = d.map(function (v) {
                return v.replaceAll(',', '');
            });
            d.unshift(stockNo);
            return d;
        });
        console.log(transferData);

        // 儲存進資料庫
        // connection.execute -> 處理 bulk insert 的 prepare statement 會有點小問題
        // 轉換為 promise 物件
        let insertStockPrices = connection.promise();
        insertStockPrices.query(
            'INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
            // 數組包數組？
            [transferData]
        );

        console.log(insertStockPrices);
    } catch (e) {
        console.error(e);
    }
    connection.end();
})();
