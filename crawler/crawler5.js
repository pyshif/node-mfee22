const fs = require('fs/promises'); // 內建
const axios = require('axios'); // 第三方提供
const moment = require('moment');
const mysql = require('mysql2');

(async function () {
    const connection = mysql.createConnection({
        host: '', // 127.0.0.1
        port: '',
        user: '',
        password: '',
        database: 'stock',
    });

    try {
        // step 1: 讀檔 stock.txt
        const stockNo = await fs.readFile('./stock.txt', 'utf-8');
        // console.log(stockNo);

        // step 2: axios 發送請求
        // const domain = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
        const domain = 'https://www.twse.com.tw/zh/api/codeQuery';
        const queryStockName = await axios.get(domain, {
            params: {
                query: stockNo,
                // response: 'json',
                // date: '20220101',
                // stockNo,
            },
        });
        console.log(queryStockName.data);
        if (
            !queryStockName.data.suggestions ||
            queryStockName.data.suggestions[0] === '(無符合之代碼或名稱)'
        ) {
            throw new Error('查無此代表');
        }
        const stockData = queryStockName.data.suggestions[0];
        const stockDatas = stockData.split('\t');
        const stockName = stockDatas[1];

        const saveNameResult = await connection.execute(
            'INSERT INTO stocks (id, name) VALUES (?, ?)',
            [stockNo, stockName]
        );
        console.log(saveNameResult);

        const queryDate = moment().format('YYYYMMDD');

        const response = await axios.get(
            'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            {
                params: {
                    response: 'json',
                    date: queryDate,
                    stockNo,
                },
            }
        );
    } catch (err) {
        console.error(err);
    }

    connection.end();
})();
