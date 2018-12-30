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
const go = (...args) => {
    log("in go");
    log(...args);
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
    iter = iter[Symbol.iterator]();
    for (const a of iter) yield f(a);
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
