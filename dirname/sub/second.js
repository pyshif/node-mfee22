const fs = require('fs/promises');
const path = require('path');

console.log('second.js', __dirname);
// __dirname : 程式碼本身所在的位置

// sol 2
fs.readFile(path.join(__dirname, '..', 'stock.txt'), 'utf-8').then((resl) => {
    console.log(resl);
});

// sol 1
// fs.readFile(`${__dirname}/../stock.txt`, 'utf-8').then((resl) => {
//     console.log(resl);
// });

// fs.readFile('../stock.txt', 'utf-8').then((resl) => {
//     console.log(resl);
// });
