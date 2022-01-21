// exports = module.exports = {}

exports.saveStockName = async function (conn, stockNo, stockName) {
    const res = await conn.execute(
        'INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)',
        [stockNo, stockName]
    );
    // console.log(res);
    return res;
};

exports.saveStockPrice = async function () {};

// return module.exports
