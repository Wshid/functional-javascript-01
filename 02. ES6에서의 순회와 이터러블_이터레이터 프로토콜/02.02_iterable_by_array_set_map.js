const log = console.log

/**
 * iterable/iterator protocol
 * iterable : iterator를 리턴하는 Symbol.iterator를 가진 값
 * iterator : {value, done} 객체를 가지는  next()를 가진 값
 *  next() 반복시
 *  {1, false}
 *  {2, false}
 *  {undefined, true}
 *      와 같이 리턴된다.
 */

log('Array -----');
const arr = [1, 2, 3];
log(arr[Symbol.iterator]); // for-of와 규악을 가지고 동작함
//arr[Symbol.iterator] = null; // 이를 사용하면 for-of가 동작하지 않음
let aiter = arr[Symbol.iterator]();
log(aiter.next());
log(aiter.next());
log(aiter.next());
for (const a of arr) {
    log(a);
}


log('Set -----');
const set = new Set([1, 2, 3]);
const iter2 = set[Symbol.iterator]();
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
for (const a of set) {
    log(a);
}


/**
 * map의 경우에도 값이 순차적으로 순회된다. 
 * */
log('Map ----');
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
const iter3 = map[Symbol.iterator]();
log(iter3.next());
log(iter3.next());
log(iter3.next());
log(iter3.next());
for (const a of map) {
    log(a);
}
log("entries test");
// keys, values 함수도 존재
for(const a of map.entries()){
    log(a);
}

/**
 * Map, Set 에서 어떤 객체를 공통으로 상속받지는 않음
 * 각개로 구현되어 있으며,
 *  iterable/iterator protocol을 따라서 구현이 되어있기 때문
 */