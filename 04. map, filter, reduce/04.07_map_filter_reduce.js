/** vscode code runner상 문제로, lib를 사용하지 않음 */
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
/**
 * lib import end
 */


const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];

/**
 * 가격을 뽑는 맵함수 사용하기
 */
log(products.map(a => a.price));
log(map(p => p.price, products));

const add = (a, b) => a + b;


/**
 * 중첩해서 사용시, 하단부터 읽어서 해석하면 됨
 * 위, 아래는 같은 코드
 */
log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price < 20000, products)))
);
log(
    reduce(
        add,
        filter(n => n < 20000,
            map(p => p.price, products)))
);

log(
    reduce(
        add,
        [10,20,30,40] // 이 자리만 바꿔준다면 코드가 되는 듯이
    )
);

/**
 * spark와 같이 특정 메소드 형태로 사용하기(기존 사용하는 방법)
 */
log(
    products
    .filter(p => p.price < 20000)
    .map(p => p.price)
    .reduce((a,b) => a+b)
);

/**
 * 함수형적으로 각각 독립적으로 값을 치환하여 사용이 가능함.
 * 해당 위치의 코드가 숫자로 평가 되는가를 감안하여 코딩을 하면 됨
 * 예를들면 위의 코드의 경우 map이나 filter의 결과로 [10,20,30,40]과 같은 정수형 리스트로 평가가 된다.
 */