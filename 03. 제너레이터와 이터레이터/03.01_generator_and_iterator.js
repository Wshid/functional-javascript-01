const log = console.log

/**
 * Generator
 *  iterator이며, iterable을 생성하는 함수
 *  *을 활용하여 생성한다.
 *  yield 키워드를 사용할 수 있다.
 */

 /**
  * 호출 횟수에 따라 다른 값들이 리턴된다.
  * yield가 하나의 step과 유사
  */
 function *gen1(){
     yield 1;
     yield 2;
     yield 3;
     return 5; // 함수의 실행 끝에 return이 없으면 return undefined; 한것과 동일함
 }

 const iter1 = gen1(); // iterable
 log(iter1[Symbol.iterator]() == iter1); // true

 log(iter1.next());
 log(iter1.next());
 log(iter1.next());
 log(iter1.next());
 log(iter1.next());

 log("iterable test");
 for(const a of gen1()){
     log(a);
 }