const fs = require('fs/promises'); // 內建
const axios = require('axios'); // 第三方提供
const moment = require('moment');
const mysql = require('mysql2');
require('dotenv').config();

(async function () {
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
        const stockNo = await fs.readFile('./stock.txt', 'utf-8');
        // console.log(stockNo);
        const codeQuery = (
            await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
                params: {
                    query: stockNo,
                },
            })
        ).data;
        // console.log(codeQuery);
        // API 回傳資料格式
        // {
        //     "query": "2330",
        //     "suggestions": [
        //         "2330\t台積電",
        //         "2330R\t台積甲",
        //         "2330T\t台積丙"
        //     ]
        // }
        if (
            !codeQuery.suggestions ||
            codeQuery.suggestions[0].includes('無符合')
        ) {
            throw new Error('查無此表');
        }

        const stockName = codeQuery.suggestions[0].split('\t')[1];
        console.log(stockName);

        const stock = await axios.get(
            'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            {
                params: {
                    response: 'json',
                    date: moment().format('YYYYMMDD'),
                    stockNo,
                },
            }
        );
        console.log(stock);

        const insertStockName = await connection.execute(
            'INSERT INTO stocks (id, name) VALUES (?, ?)',
            [stockNo, stockName]
        );
        console.log(insertStockName);

        const response = await axios.get(
            'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            {
                params: {
                    response: 'json',
                    date: moment().format('YYYYMMDD'),
                    stockNo,
                },
            }
        );

        // API 資料格式
        // fields: [
        //     '日期',
        //     '成交股數',
        //     '成交金額',
        //     '開盤價',
        //     '最高價',
        //     '最低價'
        //     '收盤價',
        //     '漲跌價差',
        //     '成交筆數'
        // ],
        // data: [
        //     [
        //         '111/01/03',
        //         '73,703,302',
        //         '46,249,716,919',
        //         '619.00',
        //         '632.00',
        //         '618.00',
        //         '631.00',
        //         '+16.00',
        //         '88,508'
        // ],
    } catch (err) {
        console.error(err);
    }

    // 關閉資料庫連線
    connection.end();
})();
