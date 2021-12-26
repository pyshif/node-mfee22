// sum.js

function sum(n) {
    if (n < 1)
        return 0;
    return n + sum(n - 1);
}

console.log('sum(1) :>> ', sum(1));
console.log('sum(2) :>> ', sum(2));
console.log('sum(3) :>> ', sum(3));
console.log('sum(4) :>> ', sum(4));