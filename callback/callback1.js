// 刷牙 2000
// setTimeout(function () {
//     let current = null;
//     do {
//         current = new Date();
//     } while (current - start < 2000);

//     console.log(`刷牙完成: ${current - start} ms`);
//     start = current;
// });

// 吃早餐 3000
// setTimeout(function () {
//     let current = null;

//     do {
//         current = new Date();
//     } while (current - start < 3000);

//     console.log(`吃完早餐: ${current - start} ms`);
//     start = current;
// });

// 寫功課 2000
// setTimeout(function () {
//     let current = null;

//     do {
//         current = new Date();
//     } while (current - start < 2000);

//     console.log(`寫完功課: ${current - start} ms`);
//     start = current;
// });

let start = new Date();
console.log(`開始: ${start}`);
setTimeout(function () {
    const current = new Date();
    console.log(`刷牙完成: ${current - start} ms`);
    start = current;
    setTimeout(function () {
        const current = new Date();
        console.log(`吃完早餐 ${current - start} ms`);
        start = current;
        setTimeout(function () {
            const current = new Date();
            console.log(`寫完功課 ${current - start} ms`);
            start = current;
        }, 2000);
    }, 3000);
}, 2000);
