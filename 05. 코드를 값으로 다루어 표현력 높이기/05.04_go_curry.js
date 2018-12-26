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

/**
 * 어떤 함수가 코드를 받아, 시점을 변환해여 처리할 수 있음
 */
log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price < 20000, products)))
);

const go = (...args) => reduce((a, f) => f(a), args);


const mult = curry((a, b) => a * b);

// 클로저 형태로 사용 가능
const mult3 = mult(3);
log(mult(2)(3));

/**
 * 이전 코드 수정하기
 * map, filter, reduce에 curry를 적용한다.
 * 이와 같이 인자 처리를 변경할 수 있음
 *  해당 위치 치환이 가능해진다.
 */

go(
    products,
    products => filter(p => p.price < 20000, products),
    products => map(p => p.price, products),
    prices => reduce(add, prices),
    log
);
go(
    products,
    products => filter(p => p.price < 20000)(products),
    products => map(p => p.price)(products),
    prices => reduce(add)(prices),
    log
);
/**
 * 최종 형태
 * go를 통해 순서를 뒤집고
 * curry를 통해 간결하게 표현한다.
 */
go(
    products,
    filter(p => p.price < 20000),
    map(p => p.price),
    reduce(add),
    log
);