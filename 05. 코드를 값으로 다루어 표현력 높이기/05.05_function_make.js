const log = console.log;

/**
 * curry
 * 함수를 값으로 다루면서, 
 *  원하는 시점에 평가한다.
 * 함수를 받아 함수를 리턴
 *  인자를 받아, 원하는 수의 인자가 들어오면 함수를 나중에 평가
 */
const curry =
    f => // 함수를 받아 함수를 리턴
        (a, ..._) => _.length ? // 함수 실행시에 인자 2개 이상시
            f(a, ..._) : // 받아둔 함수를 즉시 실행
            (..._) => f(a, ..._);  // 2개보다 작다면, 함수를 리턴
// 이후에 받은 인자를 합쳐서 처리

const map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
});

// 모든 함수가 인자를 하나만 받으면, 다음 인자를 기다리는 함수를 리턴


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


const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (...fs) => (a) => go(a, ...fs); // 함수가 리턴되는 함수

/**
 * 두 함수의 중복을 제거하기
 */
const total_price = pipe(
    map(p => p.price),
    reduce(add)
);

/**
 * 함수를 받아 pipe를 리턴
 * @param {} predi 
 */
const base_total_price = predi => pipe(
    filter(predi),
    total_price
);

go(
    products,
    base_total_price(p => p.price < 20000),
    log
);
go(
    products,
    base_total_price(p => p.price >= 20000),
    log
);