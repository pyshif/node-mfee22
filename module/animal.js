// exports = module.exports = {}

// version 1: OK
exports.eat = function (food) {
    console.log('1. food:', food);
};

// version 2: OK
// function eat(food) {
//     console.log('2. food:', food);
// }

// module.exports = { eat };

// version 3: failed
// const E = {};
// E.eat = function (food) {
//     console.log('3. food:', food);
// };

// return E;

// return module.exports
