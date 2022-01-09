// Promise 物件狀態：pending(等待處理 or 處理中), fulfilled ( resolve 成功), rejected ( reject 失敗)
// Syntax: new Promise (executor)
// Syntax: executor(resolve, reject)

function doWork(job, timer) {
    // return Promise 物件
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`工作完成: ${job}`);
            reject(`工作失敗`);
        }, timer);
    });
}

doWork('刷牙', 2000)
    .then((result) => {
        console.log(`${result} at ${new Date()}`);
        return doWork('吃早餐', 3000);
    })
    .then((result) => {
        console.log(`${result} at ${new Date()}`);
        return doWork('寫功課', 2000);
    })
    .then((result) => {
        console.log(`${result} at ${new Date()}`);
    })
    .catch((error) => {
        console.log(`${error} at ${new Date()}`);
    });

console.log(`工作開始: ${new Date()}`);
