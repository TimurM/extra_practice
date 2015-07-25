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
LRUCache.prototype.get = function(key) {
    return (this.map[key] ? this.map[key] : -1);
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
  this.map[key] = value;
  
  if(this.capacity > this.keyStack.length) {
    this.keyStack.push(key);
  } else {
    var removedKey = this.keyStack[0];
    this.keyStack = this.keyStack.slice(1);
    delete this.map[removedKey]
    this.keyStack.push(key);
  }
};


var firstMap = new LRUCache(1);

firstMap.set(2,1);
console.log(firstMap.get(2));
firstMap.set(3,2);
console.log(firstMap.get(2))
console.log(firstMap.get(3))
