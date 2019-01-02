const log = console.log;


/**
 * L.flatten, 원소를 펼쳐주는 함수(차원 내리기)
 */
log([1, 2], 3, 4, [5, 6], [7, 8, 9]);
log(...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]);

let L = {};

const isIterable = a => a && a[Symbol.iterator]; // null일때를 대비하여, 즉시 리턴
L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) for (const b of a) yield b; // a안에 있는 값들을 yield
        else yield a;
    }
};

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

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log(...it);
log(take(2, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));


const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));
