namespace alg {

function shuffle<A> (array: A[]): A[] {
    const a = [...array];
    let j, x, i;

    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))

        x = a[i];
        a[i] = a[j];
        a[j] = x
    }
    return a;
}

const nthFibonacci = (n: number): number => {
    if (n < 0) throw 'This should be higher than 0'
    if (n === 0) return 0;

    let a = 0;
    let b = 1;

    for (let i = 1; i < n; ++i) {
        const c = a + b;

        a = b;
        b = c;
    }
    return b;
}

const partition = (
    array: number[],
    left: number = 0,
    right: number = array.length - 1
) => {
    const pivot = array[Math.floor((right * left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (array[i] < pivot) {
            i++;
    }

    while (array[j] > pivot) {
        j--;
    }

    if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
    }
}

return i;
};

const QuickSort = (
    array: number[],
    left: number = 0,
    right: number = array.length - 1
) => {
    let index;

    if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
            QuickSort(array, left, index -1);
        }

        if (index < right) {
            QuickSort(array, index, right);
        }
    }
    
    return array;
};





}