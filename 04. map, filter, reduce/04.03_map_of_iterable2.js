const log = console.log;

function map(f, list){
    let res = [];
    for(const l of list){
        res.push(f(l));
    }
    return res;
}

/**
 * iterable protocol, Map.map 사용하기
 */

let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();

log(it.next());
log(it.next());

// 받을때 k,a로 받는 것 => 구조분해
map(([k, a]) => [k, a*2], m);
log(new Map(map(([k, a]) => [k, a*2], m)));