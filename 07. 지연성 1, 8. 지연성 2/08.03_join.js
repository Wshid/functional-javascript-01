const log = console.log;

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


// const filter = curry((f, iter) => {
//     let res = [];
//     for (const a of iter) {
//         if (f(a)) res.push(a);
//     }
//     return res;
// });

const filter = curry((f, iter) => {
    // log("in filter");
    // log(f, iter);
    // let res = [];
    // for (const a of iter) {
    //     if (f(a)) res.push(a);
    // }
    // return res;
    iter = iter[Symbol.iterator]();
    let res = [];
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) res.push(a);
    }
    return res;
});


const go = (...args) => {
    // log("in go");
    // log(...args);
    return reduce((a, f) => f(a), args);
}
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const map = curry((f, iter) => {
    iter = iter[Symbol.iterator]();
    let res = [];
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(f(a));
    }
    return res;
});

const take = curry((l, iter) => {
    let res = [];
    for (const a of iter) {
        if (res.length == l) break;
        res.push(a);
    }
    return res;
});

/**
 * reduce는 Array.prototype.join 함수와 유사하다.
 *  reduce 자체는 iterable 객체를 순회하여 순회하므로,
 *  다형성이 높은 join 함수 = reduce 이다.
 */

/**
 * 만든 join 함수의 경우,
 *     배열 외에 다른 형태의 iterable에서도 응용 가능하다.
 */
const join = curry((sep = ",", iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));


const custom_entries = (obj) => {
    //obj.keys
    return Object.keys(obj).map(key => [key, obj[key]])
}
var obj = { "1": 5, "2": 7, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 }
// log("obj prev");
// log(custom_entries(obj));

/**
 * iterable protocol을 따른다
 * join에게 가기전의 값들을 지연할 수 있다는 특징을 가진다.
 * reduce에서 하나씩 값을 로드하여 처리할 것이기 때문
 * L.map이어도 정상 작동한다.
 */
const queryStr = pipe(
    custom_entries
    , map(([k, v]) => `${k}=${v}`)
    , join('&')
);


function* a() {
    yield 10;
    yield 11;
    yield 12;
    yield 13;
}

// log(join(' - ', a()));
/**
 * Lazy Function의 경우 let res=[]가 필요 없음
 * 나중에 평가되기 때문에, yield로 처리한다.
 */
let L = {}
/**
 * curry를 하지 않으면, 인자를 처리하지 못한다는 에러 발생
 */
L.map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});

L.filter = curry(function* (f, iter) {
    for (const a of iter) if (f(a)) yield a;
});

L.entries = function* (obj) {
    for (const k in obj) yield [k, obj[k]];
}

// log(L.entries(obj));

var it = L.entries({ limit: 10, offset: 10 });
// log(it.next());


const lazy_queryStr = pipe(
    L.entries
    , L.map(([k, v]) => `${k}=${v}`)
    , join('&')
);

log(lazy_queryStr({ limit: 10, offset: 10, type: 'notice' }));

/**
 * 08.03 take, find
 *  find함수는 take 함수를 응용하여 만들 수 있다.
 *  find : 특정 조건을 만족하는 원소를 골라내기
 */
const users = [
    { age: 32 }
    , { age: 31 }
    , { age: 37 }
    , { age: 28 }
    , { age: 25 }
    , { age: 32 }
    , { age: 31 }
    , { age: 37 }
];

/**
 * 특정 값을 꺼내오는 함수
 * 한개의 결과만 꺼내도, 그 전에 모든 연산을 하게 한다.
 * 비효율적
 * @param {*} f 
 * @param {*} iter 
 */
const find = (f, iter) => go(
    iter
    , filter(f)
    , take(1)
    , ([a]) => a // 배열에서 값을 꺼내기
);

/**
 * lazy Filter를 이용하여
 * 지연 판단을 할 수 있도록 한다.
 */
L.find = curry((f, iter) => go(
    iter
    , L.filter(f)
    , take(1)
    , ([a]) => a // 구조분해, 배열에서 값을 꺼내기
));

log("find test")
log(L.find(u => u.age < 30)(users));

go(users
    , L.map(u => u.age)
    , L.find(n => n < 30)
    , log);