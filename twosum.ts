function twoSun(nums: number[], target:number):number[] {
    const map: Map<number, number> = new Map();
    let result: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const match = map.get(target - current);

        if(match !== undefined) {
            result = [i, match];
            break
        }
        map.set(current, 1);
    }
    return result;
}

//its a hash map that indexes the 2 closest sum of the element target and return it
//ex: 
//Input: nums = [2,7,11,15], target = 9
//Output: [0,1]
//Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].