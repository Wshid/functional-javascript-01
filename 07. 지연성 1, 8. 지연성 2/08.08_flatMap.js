const log = console.log;
let L = {};

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = f(acc, a);
    }
    return acc;
});

const go = (...args) => {
    // log("in go");
    // log(...args);
    return reduce((a, f) => f(a), args);
}
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        if (res.length == l) break;
        res.push(a);
    }
    return res;
});

const takeAll = take(Infinity);


const map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
});

const isIterable = a => a && a[Symbol.iterator]; // null일때를 대비하여, 즉시 리턴
L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) for (const b of a) yield b; // a안에 있는 값들을 yield
        else yield a;
    }
};
L.map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});
L.range = function* (l) { // 속성으로 함수 추가가 가능하다.
    let i = -1;
    while (++i < l) {
        yield i;
    }
};
var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);


const flatten = pipe(L.flatten, takeAll);


/**
 * flatMap
 * map과 flatten을 동시에 적용하는 방법
 * 최신 자바스크립트에서만 적용됨
 *  js에서 기본적으로 지연 동작을 하지 않기 때문
 * L.map, flatten을 동시 적용
 */

//log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a.map(a => a*a)));

log([[1, 2], [3, 4], [5, 6, 7]].map(a => a.map(a => a * a)));
// 첫번째 map이 하나 동작할때, 새로운 배열을 한번 만든다.
// 그 이후, 다시 순회를 하면서 배열을 담기 때문에 비효율적

/**
 * 다형성이 높고 효율적인 flatMap 작성
 *  기존 flatMap은 Array처리만 진행
 */
L.flatMap = curry(pipe(L.map, L.flatten));
//const flatMap = curry(pipe(L.flatMap, findAll));
const flatMap = curry(pipe(L.map, flatten));

var it = L.flatMap(a => a, [[1, 2], [3], [4, 5, 6]]);
//log(it.next());
//log(...it);
log([...it]);

//log(flatMap(range, map(a => a + 1, [1, 2, 3])));
//log(it.next());

log(flatMap(L.range, [1, 2, 3]));
log(flatMap(L.range, map(a => a + 1, [1, 2, 3])));