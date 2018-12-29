const log = console.log;

/**
 * range,map,filter,take,reduce 중첩 사용
 */
const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

/**
 * for...of 내부적으로 실행되는 코드가 많다.
 *  실제 구현체인 while을 사용하여 코드를 대체한다.
 */
const map = curry((f, iter) => {
    let res = [];
    // for ... of 와 동일한 코드
    iter = iter[Symbol.iterator](); // iterable -> Array[Iterator] 변경(next를 가진다)
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(f(a)); // while문을 돌면서 f(..)를 적용시킨다.
    }
    // for (const a of iter) {
    //     res.push(f(a));
    // }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) res.push(a);
    }
    // for (const a of iter) {
    //     res.push(f(a));
    // }
    return res;
});

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
    // for (const a of iter) {
    //     res.push(f(a));
    // }
    return acc;
});

const take = curry((l, iter) => {//list와 iterable을 받는다.
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length == l) return res;
    }
    // for (const a of iter) {
    //     res.push(a);
    //     if (res.length == l) return res;
    // }
    return res;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

/**
 * 어떻게 평가되는지 확인한다.
 * 실행시마다, 값이 변경되는 것을 확인할 수 있다.(res)
 * @param {} l 
 */
const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};



/**
* L.range, L.map, L.filter, take, reduce 중첩 사용
*/

const L = {};
L.range = function* (l) { // 속성으로 함수 추가가 가능하다.
    let i = -1;
    while (++i < l) {
        yield i;
    }
}; //i가 증가하는대로 build, 리턴값은 동일함

L.map = curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield f(a);
    }
    //for (const a of iter) yield f(a);
});

L.filter = curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) yield a;
    }
    //for (const a of iter) if (f(a)) yield a;
});

/**
 * test
 *  curry함수로 감싸야하는 것은 감싼다.
 * 
 */
console.time('');
go(range(10000) // [0,1,2,3,4,5,6,7,8,9]
    , map(n => n + 10) // [10,11,12,13,14,...,19]
    , filter(n => n % 2) // [11,13,15,17,19]
    , take(2)
    , log);
console.timeEnd('');

/**
 * 실행시, take를 먼저 들어간다(실제 action이기 때문)
 * 실행 순서 : take -> L.filter -> L.map -> L.range 
 *  앞 함수들에서 계속 미루기 때문
 * L.map, L.filter의 어떤 연산도 하지 않고 들어간다.
 * take(2, Generator{<suspended>}) 가 들어온다.
 *     특정 iterator를 의미(well-formed iterator)
 *     wellformed이기 때문에, iter=iter[Symbol.iterator]();를 지나도 동일함
 *  take에서 iter.next() => L.filter 함수로 이동
 *      L.filter에서 iter.next() => L.map
 *          L.map에서 iter.next() => L.range
 *              L.range에서 yield => L.map yield f(a) => L.filter yield a 순으로 이동
 *  가로가 아닌 세로로 진행 됨
 *      0       1   
 *      10      11
 *      false   true
 */
console.time('');
go(L.range(10000) // 이렇게 해도 2개만 취합된다. 
    , L.map(n => n + 10)
    , L.filter(n => n % 2)
    , take(2)
    , log);
console.timeEnd('');

/**
 * 성능비교
 * [ 11, 13 ]
 * : 7.849ms
 * [ 11, 13 ]
 * : 0.515ms
 */