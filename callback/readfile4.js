const { readFile } = require('fs');

(async function () {
    // console.log('break 1');
    const readFileResult = await new Promise((resolve, reject) => {
        // async task
        readFile('./test.txt', 'utf-8', (error, data) => {
            // 讀檔失敗，將錯誤訊息給 catch
            if (error) reject(error);
            // console.log(error);
            // 成功讀檔，將檔案內容傳給 then
            resolve(data);
        });
    });
    // console.log('break 2');
    console.log(readFileResult);
})();

// 查看 Promise 物件狀態
// console.log('Promise 物件狀態:', readFilePromise); // pending

// // then
// readFilePromise
//     .then((result) => {
//         // 輸出從 resolve 傳來的 data 內容
//         console.log(result);
//     })
//     .catch((error) => {
//         // 輸出從 reject 傳來的 data 內容
//         console.log(error);
//     });
