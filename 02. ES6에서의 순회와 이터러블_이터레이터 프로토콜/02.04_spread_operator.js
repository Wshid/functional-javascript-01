const log = console.log;

/**
 * 전개연산자
 * ... 를 의미
 * Symbol.iterator가 정의되어야만 동작이 된다.
 */

const arr = new Array(1,2,3);
const map = new Map([[1,'a'], [2,'b'], [3,'c']]);

const list3 = [1, 2];
log([...list3, ...arr, ...map]);