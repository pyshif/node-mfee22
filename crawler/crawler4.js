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
        // console.log(request.stockNo);
        const response = {};
        response.codeQuery = (
            await axios.get(request.domain, {
                params: {
                    query: request.stockNo,
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
        console.log(response.codeQuery);
        if (
            !response.codeQuery.suggestions ||
            response.codeQuery.suggestions[0].includes('無符合')
        ) {
            throw new Error('查無此表');
        }

        response.stockNo = response.codeQuery.suggestions[0].split('\t')[0];
        response.stockName = response.codeQuery.suggestions[0].split('\t')[1];
        console.log(response.stockNo);
        console.log(response.stockName);

        // request
        request.domain = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';
        request.type = 'json';
        request.date = moment().format('YYYYMMDD');
        // response
        response.stock = await axios.get(request.domain, {
            params: {
                response: 'json',
                date: request.date,
                stockNo: request.stockNo,
            },
        });

        console.log(response.stock.data);
    } catch (e) {
        console.error(e);
    }
})();
