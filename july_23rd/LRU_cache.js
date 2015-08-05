/**
 * @constructor
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.keyStack = [];
    this.map = {};
};

/**
 * @param {number} key
 * @returns {number}
 */

LRUCache.prototype.reInsertItemIntoStack = function(key) {
    var keyIndex = this.keyStack.indexOf(key);
    this.keyStack.splice(keyIndex, 1);
    this.keyStack.push(key);
};

LRUCache.prototype.get = function(key) {
  if(this.map[key]) {
    this.reInsertItemIntoStack(key);
    return this.map[key];
  } else {
    return -1
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */

LRUCache.prototype.ensureUnderCapacity = function(key, value) {
  if(this.capacity > this.keyStack.length) {
    this.map[key] = value;
    this.keyStack.push(key);
  } else {
    var removedKey = this.keyStack[0];
    this.keyStack.splice(0,1);
    delete this.map[removedKey]

    this.map[key] = value;
    this.keyStack.push(key);
  }
}
LRUCache.prototype.set = function(key, value) {

  if(this.map[key]) {
    this.reInsertItemIntoStack(key);
    this.map[key] = value;
  } else {
    this.ensureUnderCapacity(key, value);
  }
};


// var firstMap = new LRUCache(1);
// firstMapset(2,1);
// console.log(firstMap.get(2));
// firstMapset(3,2);
// console.log(firstMap.get(2))
// console.log(firstMap.get(3))

// Test2:
// 2,set(2,1)set(1,1),get(2),set(4,1),get(1),get(2)]
// var firstMap = new LRUCache(2);
// firstMap.set(2,1);
// firstMap.set(1,1);
// console.log(firstMap.get(2))
// firstMap.set(4,1);
// console.log(firstMap.get(1))
// console.log(firstMap.get(2))

// Test3:
// 2,[set(2,1),set(1,1),set(2,3),set(4,1),get(1),get(2)]
// var firstMap = new LRUCache(2);
// firstMap.set(2,1);
// firstMap.set(1,1);
// firstMap.set(2,3);
// firstMap.set(4,1);
// console.log(firstMap.get(1))
// console.log(firstMap.get(2))

// Test4:
// 2,[get(2),set(2,6),get(1),set(1,5),set(1,2),get(1),get(2)]
// var firstMap = new LRUCache(2);
// console.log(firstMap.get(2))
// firstMap.set(2,6);
// console.log(firstMap.get(1))
// firstMap.set(1,5);
// firstMap.set(1,2);
// console.log(firstMap.get(1))
// console.log(firstMap.get(2))
//
// Test5:
// var firstMap = new LRUCache(10);
// firstMap.set(10,13)
// firstMap.set(3,17)
// firstMap.set(6,11)
// firstMap.set(10,5)
// firstMap.set(9,10)
// console.log(firstMap.get(13))
// firstMap.set(2,19)
// console.log(firstMap.get(2))
// console.log(firstMap.get(3))
// firstMap.set(5,25)
// console.log(firstMap.get(8))
// firstMap.set(9,22)
// firstMap.set(5,5)
// firstMap.set(1,30)
// console.log(firstMap.get(11))
// firstMap.set(9,12)
// console.log(firstMap.get(7))
// console.log(firstMap.get(5))
// console.log(firstMap.get(8))
// console.log(firstMap.get(9))
// firstMap.set(4,30)
// firstMap.set(9,3)
// console.log(firstMap.get(9))
// console.log(firstMap.get(10))
// console.log(firstMap.get(10))
// firstMap.set(6,14)
// firstMap.set(3,1)
// console.log(firstMap.get(3))
// firstMap.set(10,11)
// console.log(firstMap.get(8))
// firstMap.set(2,14)
// console.log(firstMap.get(1))
// console.log(firstMap.get(5))
// console.log(firstMap.get(4))
// firstMap.set(11,4)
// firstMap.set(12,24)
// firstMap.set(5,18)
// console.log(firstMap.get(13))
// firstMap.set(7,23)
// console.log(firstMap.get(8))
// console.log(firstMap.get(12))
// firstMap.set(3,27)
// firstMap.set(2,12)
// console.log(firstMap.get(5))
// firstMap.set(2,9)
// firstMap.set(13,4)
// firstMap.set(8,18)
// firstMap.set(1,7)
// console.log(firstMap.get(6))
// firstMap.set(9,29)
// firstMap.set(8,21)
// console.log(firstMap.get(5))
// firstMap.set(6,30)
// firstMap.set(1,12)
// console.log(firstMap.get(10))
