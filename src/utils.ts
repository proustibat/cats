export const getAverage = ( arr: number[] ) => ( arr.reduce( ( acc, curr ) => acc + curr, 0 ) ) / arr.length;

export const getSum = ( arr: number[] ) => arr.reduce( ( acc, curr ) => acc + curr, 0 );