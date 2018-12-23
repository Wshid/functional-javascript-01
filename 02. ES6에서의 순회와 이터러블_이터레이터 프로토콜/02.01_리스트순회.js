let log = console.log;
/**
 * FP에서 리스트순회에서 많은 문제를 해결함
 */

// 기존 순회 방식
let list = [1,2,3];
for(let i=0;i<list.length;i++){
    log(list[i]);
}

// 인자 순회 방식 변경
log("changed iterate");
for(let a of list){
    log(a);
}