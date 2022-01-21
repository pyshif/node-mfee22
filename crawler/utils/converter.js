// exports = module.exports = {}
const moment = require('moment');

// 處理股票名稱
exports.parseStockName = function (codeQuery) {
    return codeQuery.suggestions[0].split('\t')[1];
};

// 處理價格資料
exports.convertPrice = function (stockNo, stockPrice) {
    return stockPrice.data.map(function (d) {
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
};

// return module.exports
