const log = console.log;
/**
 * reduce는 축약 형태를 가지기 때문에 
 * 단순 정수 뿐만 아니라 다양한 내용도 축약 가능
 * @param {} f 
 * @param {*} acc 
 * @param {*} iter 
 */
function reduce(f, acc, iter) {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}


const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];


log(reduce(
    (total_price, product) =>
        total_price + product.price, 0, products)
);