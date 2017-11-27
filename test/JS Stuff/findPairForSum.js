
/* Given a list of non-negative integers and a target sum, find a pair of numbers that sums to the target sum.

Example:

var pair = findPairForSum([3, 34, 4, 12, 5, 2], 9);
console.log(pair); // --> [4, 5]
*/

function findPairForSum(integers, target) {
  // your solution here
  /**
  const newArray = [];
  
  integers.map(integer => {
    return integers.map(nextInteger => {
      if (integer + nextInteger === target) {
        newArray.push(integer);
      }
    })
  })

  return newArray;
  */

  let sub;
  const newArray = [];
  for (let i = 0; i < integers.length; i++) {
    sub = target - integers[i];
    for (let j = 0; j < integers.length; j++) {
      if (sub === integers[j])
        newArray.push(integers[j]);
    }
  }
  return newArray;
  
}

function findPairForSum2(nums, target) {
    const firstPart = nums.find((val, ind1) => nums.filter((_, ind2) => ind1 !== ind2).includes(target - val));
    return firstPart === undefined 
        ? `No pair found that equals ${target}.`
        : [firstPart, target - firstPart];
}

function findPairForSum3(nums, target) {
    const firstPart = nums.find((val1, ind1) => nums.some((val2, ind2) => {
        return val1 + val2 === target
            && ind1 !== ind2;
    }));
    return firstPart === undefined 
        ? `No pair found that equals ${target}.`
        : [firstPart, target - firstPart];
}

const test = [3, 34, 4, 12, 5, 2];
const test1 = [3, 3];

console.log(findPairForSum2(test, 9));
console.log(findPairForSum2(test1, 6));
