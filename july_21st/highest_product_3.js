/*
Given an input array of numbers n >= 3 determine the highest product

Examples:
f([2, 3, 4]) = 24
f([2, 5, 4]) = 40
f([2, 4, 8, 5]) = 160
f([8, 5, 2, 7, 3]) = 280

Input           | Highest Numbers | Output
------------------------------------
2,3,4           | 2, 3, 4         | 24
2,5,4           | 2, 4, 5         | 40
2,4,8,5         | 4, 5, 8         | 160
8,5,2,7,3       | 5, 7, 8         | 280
-10,-10,1,3,2   | -10,-10,3       | 300
-10,1,3,2       | 1,3,2           | 6

Known:
input_array
ints
current_highest_ints

Unknown:
highest_product

Psuedocode:

-Determine the 3 highest numbers
-Create a current_highest_ints that will contain the first 3 numbers assuming
our array is at least 3 ints in length
-Iterate through array and compare each subsequent number to the lowest number
in the current_highest_ints
-If it is, then we replace the int in the current_highest_ints by this new greater_int
-We keep checking until we looked at every int in the input array

*/

var highest_product = function(input_array) {
  var currentHighestInts = [];
  var negativeHighestPair = [];

  var highest_ints = input_array.reduce(function(currentHighestInts, int) {// check if our ints is greater than any int in currentHighestInts array
      // console.log("cuurent Highs", currentHighestInts)
      if(int >= 0) {
        currentHighestInts = highestInts(currentHighestInts, int, comparePositiveNum);
      } else {
        // console.log("nHP", negativeHighestPair);
        negativeHighestPair = highestInts(negativeHighestPair, int, compareNegativeNum);
      }
      return currentHighestInts.sort();
  }, currentHighestInts);
  console.log(highest_ints);
  var productPositivePair = (highest_ints.length > 1 ? highest_ints[0] * highest_ints[1] : highest_ints[0])
  var productNegativePair = (negativeHighestPair.length > 1 ? negativeHighestPair[0] * negativeHighestPair[1] : negativeHighestPair[0])

  return (highest_ints[2] * (productPositivePair > productNegativePair ? productPositivePair : productNegativePair))
}

var highestInts = function(highestIntsArray, int, predicate) {

    var sortedCurrentHighestInts = highestIntsArray.sort();
      highestIntsArray.length == 3 && predicate(highestIntsArray, int) ?
      sortedCurrentHighestInts[0] = int :
      sortedCurrentHighestInts.push(int)
    // console.log("output", sortedCurrentHighestInts)
    return sortedCurrentHighestInts;
}

var comparePositiveNum = function(array, secondNum) {
  return array[0] < secondNum;
}

var compareNegativeNum = function(array, secondNum) {
  return array[0] > secondNum;
}

var tests = function() {

  console.log(24 === highest_product([2,3,4]));
  console.log(40 === highest_product([2,5,4]));
  console.log(160 === highest_product([2,4,8,5]));
  console.log(280 === highest_product([8,5,2,7,3]));
  console.log(300 === highest_product([-10,-10,1,3,2]));
}

// console.log(highest_product([-10, -10, 1,3,2]))
tests()
