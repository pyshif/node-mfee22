// 加 .default 讓 intellisense / autocomplete 作用
const axios = require('axios').default;

// 成功執行版本
axios
    .get('http://34.221.173.92:3000/data')
    .then(function (response) {
        console.log(this);
        console.log('status: ', response.status);
        console.log('status-text: ', response.statusText);
        // access-control-allow-origin: '*' ?
        console.log('header: ', response.headers);
        console.log('data: ', response.data);
    })
    .catch(function (error) {
        console.log(this);
        console.error(`error: ${error}`);
    });

// 錯誤測試版本
// axios
//     .get('http://34.221.173.92:3000/dat')
//     .then(function (response) {
//         console.log(this);
//         console.log('status: ', response.status);
//         console.log('status-text: ', response.statusText);
//         // access-control-allow-origin: '*' ?
//         console.log('header: ', response.headers);
//         console.log('data: ', response.data);
//     })
//     .catch(function (error) {
//         console.log(this);
//         console.error(`error: ${error}`);
//     });




