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

const map = curry((f, iter) => {
    iter = iter[Symbol.iterator]();
    let res = [];
    while(!(cur = iter.next()).done){
        const a = cur.value;
        res.push(f(a));
    }
    return res;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

/**
 * 인자를 받아 QueryString을 만든다.
 * @param {} obj 
 */
const queryStr = obj => go(
    obj
    ,Object.entries // Object.entries Not a Function
    //,{ limit: 10, offset: 10, type:'notice'}
    ,map(([k, v]) => `${k}=${v}`)
    ,reduce((a,b) => `${a}&${b}`)
);

const object1 = { limit: 10, offset: 10, type:'notice'};
log(Object.entries(object1)[1]);

/**
 * go에서 obj를 받아 obj를 바로 이용하므로
 *  pipe로 응용이 가능하다.
 */
const queryStr2 = pipe(
    Object.entries
    ,map(([k, v]) => `${k}=${v}`)
    ,reduce((a,b) => `${a}&${b}`)
);

//  log(queryStr({ limit: 10, offset: 10, type:'notice'}));