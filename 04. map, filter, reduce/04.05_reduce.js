const log = console.log;

/**
 * reduce : 값을 축약하는 함수
 *  특정한 값들을 순회하면서 하나로 합치는 과정에서 사용
 *  내부적으로 전달된 함수를 재귀시켜 값을 반환한다.
 */

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
    total = total + n;
}
log(total);

/**
 * 
 * @param {} f 
 * @param {*} acc acc를 사용하여, 초기값 설정
 * @param {*} iter 실행할 리스트 설정
 */
const reduce = (f, acc, iter) => {
    if (!iter){ // 인자를 두개 받게 되면, acc값을 설정하지 않은것이기 때문
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for(const a of iter){
        acc = f(acc,a);
    }
    return acc;
}
const add = (a, b) => a + b;


// 보통은 js에서 시작값을 생략해서 사용한다고 함
log(reduce(add, [1,2,3,4,5]));
// 15
// 내부적으로 log(add,0,[1,2,3,4,5]); 형식으로 내부 값을 빼낸다.

log(reduce(add, 1, [1,2,3,4,5]));
//16

