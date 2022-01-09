const doWork = function (task, lazy = 1000) {
    new Promise((r, j) => {
        // async task
        setTimeout(function () {
            resolve(task);
        }, lazy);
    });
};

let p1 = doWork('刷牙', 2000);
let p2 = doWork('吃早餐', 3000);
let p3 = doWork('寫功課', 2000);

Promise.all([p1, p2, p3]).then((values) => console.log(values));
// prototype 原型的方法
