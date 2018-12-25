const log = console.log;

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];

/**
 * products에서 이름만 가져오기
 */
let names = [];
for(const p of products){
    names.push(p.name);
}
log(names);

/**
 * map을 사용하여 가져오기
 *  변화를 직접적으로 일으킨다
 *  FP의 경우 함수의 리턴값으로 소통한다.
 *  고차함수
 */
const map = (f, iter) => {
    let res = [];
    for(const a of iter){
        res.push(f(a)); // 함수 위임 작업
    }
    return res;
};

log(map(p => p.name, products)); // 함수의 추상화가 일어남 보조 함수를 전달한다.

log(map(p => p.price, products));