const log = console.log;

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);


const go = (...args) => {
    // log("in go");
    // log(...args);
    return reduce((a, f) => f(a), args);
}
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

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


let L = {};

L.map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});
L.filter = curry(function* (f, iter) {
    for (const a of iter) if (f(a)) yield a;
});

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        if (res.length == l) break;
        res.push(a);
    }
    return res;
});

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};

L.range = function* (l) { // 속성으로 함수 추가가 가능하다.
    let i = -1;
    while (++i < l) {
        yield i;
    }
};

/**
 * 지연 평가가 없는 map과 filter를
 * L.map / L.filter를 이용하여 구현하기
 */

// const map = curry((f, iter) => go(
//     iter,
//     L.map(f),
//     take(Infinity)
// ));

// const map = curry((f, iter) => go(
//     L.map(f, iter)
//     ,take(Infinity)
// ));

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

log(L.map(a => a + 10, L.range(4)));
log(map(a => a + 10, L.range(4)));

const filter = curry(pipe(L.filter, takeAll));

log(filter(a => a % 2, range(4)));