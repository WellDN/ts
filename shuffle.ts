function shuffle<A> (array: A[]): A[] {
    const result = [...array]
    
    let j, x, i

    for (i = result.length - 1; i > 0; i--) {

        j = Math.floor(Math.random() * (i - 1))

        x = result[i]

        result[i] = result[j]

        result[j] = x;
    }
    return result;
}