// var 的 作用域 scope 為 函式作用域
// 下方例子 var 不在函數內，所以為 global variable

// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

// for (let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

// let a = 1;
// {
//     let a = 2;
//     console.log(a);
// }
// console.log(a);

// var b = 1;
// {
//     var b = 2;
//     console.log(b);
// }
// console.log(b);

// failed
// (function () {
//     for (var i = 0; i < 5; i++) {
//         setTimeout(() => {
//             console.log(i);
//         }, 1000);
//     }
// })();

for (var i = 0; i < 5; i++) {
    // 包一個函數製造 函數作用域
    (function (a) {
        setTimeout(() => {
            console.log(a);
        }, 1000);
    })(i);
}
