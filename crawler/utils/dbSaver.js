const conn = require('./db');

// let insertStockPrices = connection.promise();
// insertStockPrices.query(
//     'INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
//     // 數組包數組？
//     [transferData]
// );

// connection.execute -> 處理 bulk insert 的 prepare statement 會有點小問題
// 轉換為 promise 物件
exports.insert = async function (data) {
    const d = conn.promise();
    d.query(
        'INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
        // prepare statement 的數組
        [data]
    );
};
