const log = console.log;
/**
 * reduce, take
 *  최종적으로 결과를 만드는 함수
 *  iterable, 배열의 안쪽에 있는 값을 불러와 연산
 *  값을 유지시키지 않는것이 아닌 변형
 *  action(in spark)
 *  
 * map, filter
 *  배열, iterable한 값의 원소에 합수 합성 역할
 *  지연성을 가진다.
 *  map, filter를 반복하여 사용, 특정 시점에 reduce를 사용하여 
 *      실제 연산을 진행하는 식으로 구성된다.
 *  transformation(in spark)
 * 
 */