// sum.js

// 確認需求
// 思考解法：可讀性、Big O 時間複雜度、維護性

function sum(n) {
    // 停止點
    if (n < 1)
        return 0;
    return n + sum(n - 1);
}

function sum_for(n) {
    var result = 0;
    for (let i = 0; i < n; i++) {
        result += (i + 1);
    }
    return result;
}

function sum_trapezoid(n) {
    var result = (n + 1) * n / 2;
    return result;
}

console.log('sum(4) :>> ', sum(4));
console.log('sum_for(4) :>> ', sum_for(4));
console.log('sum_trapezoid(4) :>> ', sum_trapezoid(4));


// console.log('sum(1) :>> ', sum(1));
// console.log('sum(2) :>> ', sum(2));
// console.log('sum(3) :>> ', sum(3));
// console.log('sum(4) :>> ', sum(4));

// recursive 遞迴
// 通常會重地呼叫自己這個函式
// 停止點
// 缺點：效能不是最佳的

// sum(5) = 1 + 2 + 3 + 4 + 5
// sum(4) = 1 + 2 + 3 + 4

// sum(5) = sum(4) + 5
// sum(4) = sum(4) + sum(3)
// sum(3) = sum(2) + sum(1)
// sum(1) = sum(1) + sum(0)

// 壓力測試

console.time('recursive');
for (let i = 0; i < 10000; i++)
    // sum(100000); // maximum call stack size exceeded
    // sum(50000); // maximum call stack size exceeded
    // sum(10000); // 1.198 秒
    sum(100); // 62.087 毫秒
console.timeEnd('recursive');

console.time('for')
for (let i = 0; i < 10000; i++)
    // sum_for(100000); // 1.194 秒
    // sum_for(50000); // 510.471 毫秒
    // sum_for(10000); // 112.668 毫秒
    sum_for(100); // 4.485 毫秒
console.timeEnd('for')

console.time('trapezoid')
for (let i = 0; i < 10000; i++)
    // sum_trapezoid(100000); // 2.305 毫秒
    // sum_trapezoid(50000); // 1.04 毫秒
    // sum_trapezoid(10000); // 0.691 毫秒
    sum_trapezoid(100); // 1.155 毫秒
console.timeEnd('trapezoid')
