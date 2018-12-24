const log = console.log;

function* odds2(limit) {
    for (let i = 1; i < limit; i = i + 2) {
        yield i;
    }
}

let odds = odds2;

log([...odds2(10), ...odds2(9)]); // 전개연산자 사용

/**
 * 구조분해
 */
const [head] = odds2(7); // 가장 앞 값만 가져온다
log(head);

/**
 * 나머지 연산자
 *  전개 연산자를 사용하면, 배열 형태로 값을 가져온다.
 */

const [head_2, ...tail] = odds(7);
log(head_2, tail);

const iter3 = odds(9);
iter3.next();
iter3.next();
//iter3[Symbol.iterator] = null; // 구문 사용시 에러
const[head_3, ...tail_3] = iter3;
log(head_3, tail_3);