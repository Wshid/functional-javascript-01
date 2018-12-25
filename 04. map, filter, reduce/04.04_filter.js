const log = console.log;

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];

/**
 * filter, 특정 원소를 걸러내는 코드
 */
const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a); // 조건문이 들어간다.
    }
    return res;
}

let under20000 = [];
for (const p of products) {
    if (p.price < 20000) under20000.push(p);
}
log(...under20000);

log(...filter(p => p.price < 20000, products));
log(filter(n => n%2, [1,2,3,4]));
/**
 * generator를 넘겨서 처리할 수 있음
 */
log(filter(n => n%2, function *(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}() ));