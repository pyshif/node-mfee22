const fs = require('fs/promises'); // 內建
const axios = require('axios'); // 第三方
const moment = require('moment');

// 查詢股票名稱

(async () => {
    try {
        const request = {
            domain: 'https://www.twse.com.tw/zh/api/codeQuery',
            stockNo: '',
        };
        // 讀取檔案（股票代碼）
        request.stockNo = await fs.readFile('./stock.txt', 'utf-8');
        const response = await axios.get(request.domain, {
            params: {
                query: request.stockNo,
            },
        });
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
            !response.data.suggestions ||
            response.data.suggestions[0].includes('無符合')
        ) {
            throw new Error('查無此表');
        } else {
            console.log(response.data);
        }

        const stockName = response.data.suggestions[0].split('\t')[1];
        console.log(stockName);

        request.domain = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
        request.type = 'json';
        request.date = moment().format('YYYYMMDD');
        const responseS = await axios.get(request.domain, {
            params: {
                response: 'json',
                date: request.date,
                stockNo: request.stockNo,
            },
        });

        console.log(responseS.data);
    } catch (e) {
        console.error(e);
    }
})();
