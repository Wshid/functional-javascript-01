const log = console.log;

const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
};

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
};

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
};
const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];

const add = (a, b) => a + b;
/**
 * lib import end
 */

/**
 * 어떤 함수가 코드를 받아, 시점을 변환해여 처리할 수 있음
 */
log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price < 20000, products)))
);
/**
 * 순차적으로 라인별로 진행되는 함수
 * 이전 라인의 output은 다음 라인의 input이다.
 * 하나의 값으로 축약해 나가는 과정
 *  reduce의 로직
 *  args를 특정 값으로 축약함
 */
const go = (...args) => reduce((a, f) => f(a), args);

go(
    0,
    a => a + 1,
    a => a + 10,
    a => a + 100,
    log
);
