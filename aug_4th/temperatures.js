/*
Problem:
Build a temperature class that performs the following operations:

-insert()
-get_max()
-get_min()
-get_mean()
-get_mode()

Optimize for space & time. Favor speeding up get_ functions over speeding up insert functions

Known:
temperatures

Unknown:
-highestTemp
-lowestTemp
-total_sum
-mode

Insert | get_max | get_min | get_mean | get_mode   |All numbers
--------------------------------------------------------------------
5      |   5     |  5      |    5     |     5      |  5
7      |   7     |  5      |    6     |     5 or 7 |  5, 7
2      |   7     |  2      |    4.67  |     5 or 7 |  5, 7, 2
5      |   7     |  2      |    4.75  |     5      |  5, 7, 2, 5
4      |   7     |  2      |    4.6   |     5      |  5, 7, 2, 5, 4

Psuedocode:
-On insert, update get_max & get min
-add all items being added to total_sum
-Add the inserted number as a key in a map
and the number of times it's repeated as the value
-Insert operation is going to be O(n) time
-Get operations will be O(1) time
-Space complexity is going to be O(n)
*/

var Temperatures = function() {

  // for min &  max
  this.max = 0;
  this.min = 110;

  //for mean
  this.totalSum = 0;
  this.tempsLength = 0;
  this.mean = null;

  //for mode
  this.occurances = new Array(110);
  this.maxOccurances = 0;
  this.mode = null;
};

Temperatures.prototype.insert = function(value) {

    //sets min & max
    this.max = value > this.max ? value : this.max;
    this.min = value < this.min ? value : this.min;

    // sets mean
    this.totalSum += value;
    this.tempsLength += 1
    this.mean = this.totalSum / this.tempsLength;

    // sets mode
    var currentValueOccurance;
    if(this.occurances[value] === undefined) {
      this.occurances[value] = 1;
    } else {
      this.occurances[value] += 1;
    }

    currentValueOccurance = this.occurances[value];
    this.mode = this.mode > currentValueOccurance ? this.mode : value;
};

Temperatures.prototype.get_max = function() {
  return this.max;
};

Temperatures.prototype.get_min = function() {
  return this.min;
};

Temperatures.prototype.get_mean = function() {
  return this.mean;
};

Temperatures.prototype.get_mode = function() {
  return this.mode;
};

var test = function() {

  var firstTrial = new Temperatures;
  console.log(firstTrial);
  firstTrial.insert(5);
  firstTrial.insert(7);
  firstTrial.insert(2);
  firstTrial.insert(5);
  firstTrial.insert(4);

  console.log(firstTrial.get_max() === 7);
  console.log("max", firstTrial.get_max());
  console.log(firstTrial.get_min() === 2);
  console.log("min", firstTrial.get_min());
  console.log(firstTrial.get_mean() === 4.6);
  console.log("mean", firstTrial.get_mean());
  console.log(firstTrial.get_mode() === 5);
  console.log("mode", firstTrial.get_mode());

}

test();
