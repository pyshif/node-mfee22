const moment = require('moment');
// moment document
// https://momentjs.com/docs/#/parsing/string/

// 民國 -> 西元
const year = parseInt('111/01/03'.replaceAll('/', '')) + 19110000;
console.log(moment(year, 'YYYYMMDD').format('YYYY-MM-DD'));

// 去掉 ,
console.log('73,703,302'.replaceAll(',', ''));
