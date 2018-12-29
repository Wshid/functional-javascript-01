const log = console.log;

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}

/**
 * range
 */

const add = (a, b) => a + b;

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
};

log(range(5));
// [0, 1, 2, 3, 4]

log(range(2));
// [0, 1, 2]

let list = range(4);
log(list)
log(list.reduce(add)); // reduce()함수로도 변경할 수 있다.


/**
 * L.range 느긋한 range
 */
const L = {};
L.range = function* (l) { // 속성으로 함수 추가가 가능하다.
    let i = -1;
    while (++i < l) {
        yield i;
    }
}; //i가 증가하는대로 build, 리턴값은 동일함

let llist = L.range(4);
log(llist); // iterator를 리턴한다, 배열 형태가 아닌 상태로 구성됨(action이 일어나지 않음)
//log(llist.reduce(add));. .reduce 메서드가 존재하지 않음

// log(llist.next());
// log(llist.next());
// log(llist.next());
// log(llist.next());

log(reduce(add, llist));
/**
 * 같은 내용을 리턴한 이유는,
 * reduce가 배열과 llist라는 이터레이터를 다 받아낼 수 있기 때문이다.
 * range는
 *  reduce전에 이미 배열로 평가 됨
 * L.range는 
 *  reduce전에 실행되지 않음
 *  평가 시점은 iterator 값을 순회 할때 평가된다.
 *  즉, iter.next()와 같이 동작을 해야만 평가가 됨
 *  보다 효율적 
 *      array를 만들고 도는 것이 아닌,
 *      단순 iterator만 생성하여 추후 돌리기 때문
 * 
 */
/**
 * spark w/ scala에서 생각했을 때,
 *  특정 action이 발생해여야만 값이 처리되는 것과 동일함
 */


/**
 * range, L.range 테스트
 *  테스트 함수를 구상한다.
 *  javascript에서 성능 측정 방법 : http://vnthf.logdown.com/posts/2016/10/06/javascript
 */
function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(100000)));
test('L.range', 10, () => reduce(add, L.range(100000)));