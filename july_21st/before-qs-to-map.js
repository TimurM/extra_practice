var convertMapArr = function(keyValPair) {
  queryMap = {}

  var queue = keyValPair.reduce(function(keysArray, keyValArr) {
    var firstArr = keyValArr[0];
    var key = firstArr[0];
    var value = keyValArr[1];
    var remainingChildren = firstArr.slice(1);

    var keyExistsInMap = (key in queryMap);
    queryMap[key] = (keyExistsInMap ? //checks to see if key already exists
      queryMap[key].concat([[remainingChildren, value]]) : //adds the remaining keyValArr
      //to the lists which is stored as the value at that key
      [[remainingChildren, value]]);
    return keyExistsInMap ? keysArray : keysArray.concat([key]);

  }, [])

  return queue.reduce(function(queryMap, key) {
    var value = queryMap[key];
    queryMap[key] = (value[0][0].length === 0 ? value[0][1] : convertMapArr(value))
    return queryMap
  }, queryMap);
}

var test = function(testData) {
  var input = testData.input
  var expected = testData.expected

  var actual = convertMapArr(input)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

var util = require('util')
function dump(o) {  }

;[
  {
    input: [[[ 'utf8' ], '%E2%9C%93']],
    expected: {
      'utf8': '%E2%9C%93'
    }

  },

  {
    input: [[[ 'reservation', 'purpose' ], 'myles+byrne' ]],
    expected: {
          'reservation': {
            'purpose': 'myles+byrne'
          }
    }

  },

  {
    input: [[[ 'reservation', 'expected_occupancy', 'actual_occ' ], 'resp' ]],
    expected: {
        'reservation': {
          'expected_occupancy': {
              'actual_occ': 'resp'
          }
        }
      }
  },

  {
    input: [
            [[ 'reservation', 'expected_occupancy', 'actual_occ' ],'resp' ],
            [[ 'reservation', 'expected_occupancy', 'real_occ' ], 'resp']
            ],
    expected: {
        'reservation': {
          'expected_occupancy': {
              'actual_occ': 'resp',
              'real_occ': 'resp'
          }
        }
      }
  }
].forEach(test)
console.log("tests pass")

/*
[
  [ [ 'utf8' ], '%E2%9C%93' ],
  [ [ 'authenticity_token' ],
    'UA5dTNDXx8lw2ZVdk%2BRjk2z0fB%2BcRwAHEkZimLpAIcw%3D' ],
  [ [ 'reservation', 'purpose' ], 'myles+byrne' ],
  [ [ 'reservation', 'expected_occupancy', 'actual_occ' ],
    'resp' ],
  [ [ 'reservation', 'expected_occupancy', 'real_occ' ], 'resp' ],
  [ [ 'reservation', 'host_first_name' ], '' ],
  [ [ 'reservation', 'host_last_name' ], '' ],
  [ [ 'reservation', 'host_email' ], '' ],
  [ [ 'reservation', 'email_receipt' ], '0' ],
  [ [ 'reservation', 'email_receipt' ], '1' ],
  [ [ 'reservation', 'on' ], '2015-07-16' ],
  [ [ 'reservation', 'starts_at_s' ], '6%3A45+PM' ],
  [ [ 'reservation', 'finishes_at_s' ], '8%3A45+PM' ],
  [ [ 'reservation', 'quiet' ], '0' ],
  [ [ 'reservation', 'repeats' ], '0' ],
  [ [ 'repeating', 'freq' ], 'WEEKLY' ],
  [ [ 'repeating', 'interval' ], '1' ],
  [ [ 'repeating', 'duration_kind' ], 'COUNT' ],
  [ [ 'repeating', 'duration_count' ], '2' ],
  [ [ 'repeating', 'duration_count_unit' ], 'WEEK' ],
  [ [ 'repeating', 'until_at_s' ], '07%2F22%2F2015' ],
  [ [ 'commit' ], 'Create+Reservation' ]
]
*/
