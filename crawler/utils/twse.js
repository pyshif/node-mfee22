// exports = module.export = {}
const axios = require('axios');
const moment = require('moment');

// 模組開做多少事情？（當命名變數感覺開始衝突時，表示功能開始重複，可以切割？）
// async function 回傳的是一個 Proimse 物件？
exports.queryStockName = async function (stockNo) {
    try {
        // API 回傳資料格式
        // {
        //     "query": "2330",
        //     "suggestions": [
        //         "2330\t台積電",
        //         "2330R\t台積甲",
        //         "2330T\t台積丙"
        //     ]
        // }
        const response = await axios.get(
            'https://www.twse.com.tw/zh/api/codeQuery',
            {
                params: {
                    query: stockNo,
                },
            }
        );

        if (
            !response.data.suggestions ||
            response.data.suggestions[0].includes('無符合')
        ) {
            throw new Error('查無此表');
        }

        return response.data;
    } catch (e) {
        return e;
    }
};

exports.queryStockPrice = async function (
    stockNo,
    queryDate = moment().format('YYYYMMDD')
) {
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
    return response.data;
};

// return module.export
