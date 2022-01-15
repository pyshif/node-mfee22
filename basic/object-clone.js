let car1 = {
  brand: 'ford',
  color: 'red',
  owner: 'Paul'
};

let car2 = car1;
car2.owner = 'Jack';
console.log('car1.owner: ', car2.owner);
console.log('car1 = car2 ?: ', car1 === car2);

// solution 1
let car3 = {...car1};
console.log('car1 = car3 ?: ', car1 === car3);
console.log('car1: ', car1);
console.log('car3: ', car3);

// solution 2
let car4 = JSON.stringify(car1);
console.log(car4);
car4 = JSON.parse(car4);
console.log(car4);
console.log('car4 = car1 ?: ', car4 === car1);

// solution 3
let car5 = {};
for (key in car1) {
  // console.log(`car1[${key}]: ${car1[key]}`);
  car5[key] = car1[key];
}
console.log('car5 = car1 ?: ', car5 === car1);
console.log(car5);

// advance
// 注意！Destructure Assignment 解構賦值 只會作用第一層
// 如何解決深拷貝？