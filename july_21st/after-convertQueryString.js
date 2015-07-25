const KVPairItemsDelimeter = "&"
const KVPairDelimeter = "="

// str -> [str]
// "a=b&c=d" -> ["a=b", "c=d"]
var splitOnKVPairItemsDelimeter = function(/*string*/string) { /* array of strings */
  return string.split(KVPairItemsDelimeter);
}

// ["a=b", "c=d"] -> [ [ 'a', 'b' ], [ 'c', 'd' ] ]
var splitItemsOnKVPairDelimeter = function(/*array*/stringsArray) {
  return stringsArray.reduce(function(subArray, keyValueString) {
    var subArrayKeyValue = keyValueString.split(KVPairDelimeter).map(decodeURIComponent)
    return subArray.concat([subArrayKeyValue]);
  },[])
}

// list<pair<string, string>> -> list<pair<[string], string>>>
// [ [ 'a[b]', 'c' ], [ 'd[e]', 'e' ] ] -> [ [ [ 'a', 'b' ], 'c' ], [ [ 'd', 'e' ], 'e' ] ]
var parseKeysIntoList = function(arrayKeyStrVal) {
  return arrayKeyStrVal.map(function(keyValueArray) {
    var key = keyValueArray[0].split("[").map(function(el){return el.split("]").join("")});
    var value = keyValueArray[1];
    return [key, value]
  })
}

// input: [
//         [[ 'reservation', 'expected_occupancy', 'actual_occ' ],'resp' ],
//         [[ 'reservation', 'expected_occupancy', 'real_occ' ], 'resp']
//         ],
// expected: {
//     'reservation': {
//       'expected_occupancy': {
//           'actual_occ': 'resp',
//           'real_occ': 'resp'
//       }
//     }
//   }

var convertArrToMap = function(keyValPairs) {
  var queryMap = {}

  var topLevelKeys = keyValPairs.reduce(function(topLevelKeySet, keyValArr) {
    var keyAsList = keyValArr[0];
    var value = keyValArr[1];

    var key = keyAsList[0]; // first key in list
    var restOfKeysInList = keyAsList.slice(1);

    var keyExistsInMap = (key in queryMap) // is existing top level key

    // side effect (mutate queryMap)
    if (!keyExistsInMap) queryMap[key] = [] // build the queue
    queryMap[key] = queryMap[key].concat([[restOfKeysInList, value]]) // enqueue

    return keyExistsInMap ? topLevelKeySet : topLevelKeySet.concat([key]);
  }, [])


  return topLevelKeys.reduce(function(queryMap, key) {
    console.log("key", queryMap[key]);
    // key -> [[[], 'value']]
    var enqueuedKeyValuePairs = queryMap[key];
    queryMap[key] = (
      enqueuedKeyValuePairs[0][0].length === 0 ? // is base case: [[[], 'primitive value']]
      enqueuedKeyValuePairs[0][1] :              // unwrap to primitive
      convertArrToMap(enqueuedKeyValuePairs)) // recurse
    return queryMap
  }, queryMap);
}



var fromQS = function(qs) {
  return (
    convertArrToMap(
      parseKeysIntoList(
        splitItemsOnKVPairDelimeter(
          splitOnKVPairItemsDelimeter(qs)))));
}

console.log(fromQS('utf8=%E2%9C%93&authenticity_token=UA5dTNDXx8lw2ZVdk%2BRjk2z0fB%2BcRwAHEkZimLpAIcw%3D&reservation%5Bpurpose%5D=myles+byrne&reservation%5Bexpected_occupancy%5D%5Bactual_occ%5D=resp&reservation%5Bexpected_occupancy%5D%5Breal_occ%5D=resp&reservation%5Bhost_first_name%5D=&reservation%5Bhost_last_name%5D=&reservation%5Bhost_email%5D=&reservation%5Bemail_receipt%5D=0&reservation%5Bemail_receipt%5D=1&reservation%5Bon%5D=2015-07-16&reservation%5Bstarts_at_s%5D=6%3A45+PM&reservation%5Bfinishes_at_s%5D=8%3A45+PM&reservation%5Bquiet%5D=0&reservation%5Brepeats%5D=0&repeating%5Bfreq%5D=WEEKLY&repeating%5Binterval%5D=1&repeating%5Bduration_kind%5D=COUNT&repeating%5Bduration_count%5D=2&repeating%5Bduration_count_unit%5D=WEEK&repeating%5Buntil_at_s%5D=07%2F22%2F2015&commit=Create+Reservation'))
