const log = console.log;

/**
 * 값을 받아 일부만 출력해주는 함수
 * @param {int} l limit 
 * @param {*} iter 
 */
const take = (l, iter) => {//list와 iterable을 받는다.
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length == l) return res;
    }
    return res;
}

log(take(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
log(take(3, Array(1, 2, 3, 4, 5)))

/**
 * range와 L.range를 사용할때,
 *  실제 배열 크기 만큼을 다 가지지 않으며, 중간에 평가를 완료시키기 때문에,
 *  성능차이가 크다.
 *  L.range의 경우 인자로 Infinity값을 줄 수 있다.
 *      단, range(Infinity)의 경우 브라우저가 종료된다.
 */


const take_curry = curry((l, iter) => {//list와 iterable을 받는다.
    let res = [];
    for (const a of iter) {
        res.push(a);
        if (res.length == l) return res;
    }
    return res;
})

console.time('');
go( // 기존코드를 보기 좋게 설정
    range(10000),
    take_curry(5),
    reduce(add),
    log
);
console.timeEnd('');

console.log('');
go(
    L.range(10000)
    ,take_curry(5) // take이나 reduce를 만나야 실제 연산이 이루어진다.
    ,reduce(add)
    ,log
);
console.timeEnd('');