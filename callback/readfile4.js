const { readFile } = require('fs/promises');

(async function () {
    try {
        const readFileResult = await readFile('test.txt', 'utf-8');
        console.log(`file content: ${readFileResult}`);
    } catch (err) {
        console.error(err);
    }
})();

// const { readFile } = require('fs');
// (async function () {
//     // console.log('break 1');
//     const readFileResult = await new Promise((resolve, reject) => {
//         // async task
//         readFile('./test.txt', 'utf-8', (error, data) => {
//             // 讀檔失敗，將錯誤訊息給 catch
//             if (error) reject(error);
//             // console.log(error);
//             // 成功讀檔，將檔案內容傳給 then
//             resolve(data);
//         });
//     });
//     // console.log('break 2');
//     console.log(readFileResult);
// })();
