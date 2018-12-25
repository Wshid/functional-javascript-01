const log = console.log;
/**
 * map은 iterable protocol을 따른다.
 */
function map(f, list) {
    let ret = [];
    for (const a of list) {
        ret.push(f(a))
    }
    return ret;
}

log([1, 2, 3].map(f => f + 1));

/**
 * querySelectorAll은 map 함수가 내부적으로 구현되어 있지 않기 때문에
 *  동작하지 않는다.
 */
//log(document.querySelectorAll("*").map(el => el.nodeName));
// HTML에서 지원하는 helper함수도 iterable이 적용된다.

// iterable protocol을 따르기 때문에, 해당 구문은 동작한다.
//const it = document.querySelectorAll("*")[Symbol.iterator]();

function* gen() {
    yield 2;
    if (false) yield 3;
    yield 4;
}
//log(gen.map(a => a*a));
log(map(a => a * a, gen()));
