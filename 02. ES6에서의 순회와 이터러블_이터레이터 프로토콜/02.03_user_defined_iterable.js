const log = console.log;

const iterable = {
    [Symbol.iterator]: function () {
        let limit = 3;
        return {
            next() {
                return limit < 1 ? { value: undefined, done: true } : { value: limit--, done: false }
            }
            , [Symbol.iterator]: function () { return this; } // 자기 자신을 리턴하는 것을 명시해주어야 함(Well-formed iterator)
        }
    }
};

/**
 * Symbol.iterator = this를 지정해주지 않으면
 * TypeError: iter4[Symbol.iterator] is not a function
    at Object.<anonymous> (d:\functional-javascript-01\02. ES6에서의 순회와 이터러블_이터레이터 프로토콜\02.03_user_defined_iterable.js:19:36)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:389:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:504:3
 * 이와 같은 에러가 발생한다.
 */
const iter4 = iterable[Symbol.iterator]();
log(iter4.next());
log(iter4.next());
log("iter 4 test");
log(iter4 == iter4[Symbol.iterator]());
for (const a of iter4) {
    log(a);
}
log(iter4.next());
log(iter4.next());

/**
 * iterable은 Symbol.iterator를 가진다.
 */
for (const a of iterable) {
    log(a);
}

/**
 * Well-formed iterator
 * 어느 정도 중간 진행된 iterator를 변수로 지정하고 다시 재개할 수 있도록 하는 방식
 */
const arr2 = [1, 2, 3];
const iter5 = arr2[Symbol.iterator]();
for (const a of iter5) {
    log(a);
}