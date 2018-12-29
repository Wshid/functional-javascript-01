const log = console.log;

/**
 * 지연성을 가진 map을 만들되,
 *  generator/iterator protocol을 유지해야 함
 */


let L = {}
L.map = function* (f, iter) {
    for (const a of iter) yield f(a);
};
//let it = L.map([1,2,3]);
let it2 = L.map(a => a + 10, [1, 2, 3])
/**
 * it.next()를 해야, 평가한 만큼 결과 반환이 가능하다.
 */


log(it2)
log(...it2);
// Object [Generator] {}
// 11 12 13