// async: 4, 1, 5, 2, 3
// 如果這個檔案的執行在 只有一核心的電腦上的 node，有機會變成 4, 1, 2, 3, 5 嗎？
async function test() {
    console.log(1);

    await new Promise((r, j) => {
        setTimeout(() => {
            console.log(2);
            r();
        }, 0);
    });

    console.log(3);
}

console.log(4);
test();
console.log(5);
