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
const go = (...args) => reduce((a, f) => f(a), args);
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
 * go와 다르게 함수를 리턴하는 함수
 *  go의 경우 함수와 인자를 즉시 평가
 *  pipe는 함수를 합성하여 하나로 만든다.
 *  내부적으로 go를 사용하는 함수
 */
const pipe = (...fs) => (a) => go(a, ...fs); // 함수가 리턴되는 함수
const f = pipe(
    a => a + 1,
    a => a + 10,
    a => a + 100
);

log(f(4));

/**
 * 인자를 2개 이상 전달 받을 수 있는 pipe로 구성하기
 */
const pipe2 = (f, ...fs) => (...as) => go(f(...as), ...fs);
