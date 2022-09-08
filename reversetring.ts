export function solution(str: string): string { //so instead of 'hello' it will be 'olleh' for some reason you have to re-map until reverse idk
    return str.split("").reverse().join("");
  }