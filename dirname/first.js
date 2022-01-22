const fs = require('fs/promises');

console.log('first.js', __dirname);

fs.readFile('stock.txt', 'utf-8').then((resl) => {
    console.log(resl);
});
