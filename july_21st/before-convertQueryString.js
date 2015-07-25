var parseString = function(/*string*/string) { /* array of strings */
  return string.split("&");
}

var parseKeyValueString = function(/*array*/stringsArray) {
  return stringsArray.reduce(function(subArray, keyValueString) {
    var subArrayKeyValue = keyValueString.split("=")
    return subArray.concat([subArrayKeyValue]);
  },[])
}

var parseQueryString = function(/*list<pair<string, string>>*/ arrayKeyStrVal) { /* map of key to value */
  return arrayKeyStrVal.map(function(keyValueArray) {
    var key = keyValueArray[0].split("%5B").map(function(el){return el.split("%5D").join("")});
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
var convertArrToMap = function(keyValPair) {
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
    queryMap[key] = (value[0][0].length === 0 ? value[0][1] : convertArrToMap(value))
    return queryMap
  }, queryMap);
}

var fromQS = function(qs) {
  return (convertArrToMap(parseQueryString(parseKeyValueString(parseString(qs)))));
}

console.log(fromQS('utf8=%E2%9C%93&authenticity_token=UA5dTNDXx8lw2ZVdk%2BRjk2z0fB%2BcRwAHEkZimLpAIcw%3D&reservation%5Bpurpose%5D=myles+byrne&reservation%5Bexpected_occupancy%5D%5Bactual_occ%5D=resp&reservation%5Bexpected_occupancy%5D%5Breal_occ%5D=resp&reservation%5Bhost_first_name%5D=&reservation%5Bhost_last_name%5D=&reservation%5Bhost_email%5D=&reservation%5Bemail_receipt%5D=0&reservation%5Bemail_receipt%5D=1&reservation%5Bon%5D=2015-07-16&reservation%5Bstarts_at_s%5D=6%3A45+PM&reservation%5Bfinishes_at_s%5D=8%3A45+PM&reservation%5Bquiet%5D=0&reservation%5Brepeats%5D=0&repeating%5Bfreq%5D=WEEKLY&repeating%5Binterval%5D=1&repeating%5Bduration_kind%5D=COUNT&repeating%5Bduration_count%5D=2&repeating%5Bduration_count_unit%5D=WEEK&repeating%5Buntil_at_s%5D=07%2F22%2F2015&commit=Create+Reservation'))
