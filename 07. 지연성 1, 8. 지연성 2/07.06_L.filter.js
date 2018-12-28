const log = console.log;

let L = {}

L.filter = function* (f, iter) {
    for (const a of iter) if (f(a)) yield a; // 특정 조건에 해당해야만 yield한다.
}

let it = L.filter(a => a % 2, [2, 3, 4, 5, 6, 7]);
log(it)
log(it.next());
log(it.next());
log(it.next());
