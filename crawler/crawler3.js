const fs = require('fs/promises'); // 內建
const axios = require('axios'); // 第三方提供

(async function () {
    try {
        // step 1: 讀檔 stock.txt
        const stockNo = await fs.readFile('./stock.txt', 'utf-8');
        // console.log(stockNo);

        // step 2: axios 發送請求
        const domain = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
        const response = await axios.get(domain, {
            params: {
                response: 'json',
                date: '20220101',
                stockNo,
            },
        });

        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
})();
