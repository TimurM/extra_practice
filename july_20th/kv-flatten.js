var kvFlattenKeys = function(kvNestedPairs, parentKey) {
  parentKey = parentKey || [];

  return kvNestedPairs.reduce(function(flattenKVPairs, pair) {
      var key = parentKey.concat(pair[0]);
      var value = pair[1];
      return flattenKVPairs.concat(
          (/*is leaf */typeof value === 'string') ?
            [[key, value]] : //this array gets unwrapped by concat
            kvFlattenKeys(value, key) // returned value is an array of flaten kv pairs
      );
  },[])
}

var test = function(testData) {
  var input = testData.input
  var expected = testData.expected

  var actual = kvFlattenKeys(input)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

;[

  {
    input: [],
    expected: []
  },

  {
    input: [ // Items in lists must always be pairs
      ['a', 'b']
    ],
    expected: [ // keys always become lists
      [['a'], 'b']
    ]
  },

  {
    input: [
      ['a',
        [['b', 'c']]]
    ],
    expected: [
      [['a', 'b'], 'c'],
    ]
  },

  {
    input: [
      [ 'a', [
        [ 'b', [
          [ 'c', 'd' ] ] ] ] ] ],
    expected: [[ ['a', 'b','c'], 'd']]
  },

   {
    input: [
      ['a',
        [['b', 'c'],
         ['f', 'g']
        ]
      ]
    ],
    expected: [
      [['a', 'b'], 'c'],
      [['a', 'f'], 'g']
    ]
  },

].forEach(test)
console.log("tests pass")
