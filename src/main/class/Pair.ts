export default class Pair<T1, T2> {
    private first: T1
    private second: T2

    constructor(first: T1, second: T2) {
        this.first = first
        this.second = second
    }

    getFirst(): T1 {
        return this.first
    }

    getSecond(): T2 {
        return this.second
    }

    setFirst(first: T1): void {
        this.first = first
    }

    setSecond(second: T2): void {
        this.second = second
    }
}
