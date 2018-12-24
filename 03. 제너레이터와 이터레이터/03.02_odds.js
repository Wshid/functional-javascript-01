const log = console.log;
/**
 * generator를 사용하여 홀수값만 순회하도록 하기
 */

function* odds() {
    yield 1;
    yield 3;
    yield 5;
}

const iter2 = odds();
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

for (const a of iter2) log(a);

/**
 * 
 * @param {int} limit limit값을 받아 홀수만 리턴할 수 있도록 한다.
 */
function* odds2(limit) {
    for (let i = 1; i <= limit; i++) {
        if (i % 2) yield i;
    }
}

for(const a of odds2(13)){
    log(a);
}
