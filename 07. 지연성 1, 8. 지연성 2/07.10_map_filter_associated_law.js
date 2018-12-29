/**
 * map, filter 계열 함수들이 가지는 결합 법칙
 *  사용하는 데이터가 무엇이든지
 *  사용하는 보조 함수가 순수함수라면 무엇이든지
 *      세로로 평가한다
 *      지연평가하는 성질을 가진다.
 *      lazy evaluation이 동작함
 *      이 두가지 결과가 같음
 *        [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 *        [[mapping, filtering, mapping], [mapping, filtering, mapping]]
 */
/**
 * 지연 평가의 장점
 *  함수와 함수가 리턴값을 통해 지연적으로 평가
 *  약속된 규악을 가지고 처리하기 때문에 안전하게 합성이 가능함
 *  서로 다른 라이브러리, 함수들은
 *      기본 값, 객체를 전달하고 받을 수 있으므로
 *      조합성이 높음
 */