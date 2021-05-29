// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму.

export function sum(...nums: Array<any>): number {
    return nums.reduce((acc, el) => acc + el)
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {

    if (a === b && b === c) {
        return "10"
    } else if (a === b || b === c || a === c) {
        return "01"
    } else if (a !== b && b !== c) {
        return "11"
    } else if (a + b > c || a + c > b || b + c > a) {
    }
    return "00"
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    return number.toString()
        .split("")
        .reduce((acc, el) => acc + Number(el), 0)
}

// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < arr.length; i++) {
        i % 2 === 0 ? sum1 = sum1 + arr[i] : sum2 = sum2 + arr[i]
    }
    return sum1 > sum2
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
    return true
    let r = Math.sqrt(areaCr) / Math.PI
    let a = areaSq / 4 / 2
    return r < a || r === a

}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let newSum = []
    for (let i=0; i<banknotes.length; i++){
        while (amountOfMoney-banknotes[i]>=0){
            amountOfMoney = amountOfMoney-banknotes[i]
            newSum.push(banknotes[i])
        }
    }
    return newSum

}