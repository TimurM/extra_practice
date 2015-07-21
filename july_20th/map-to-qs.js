queryMap = {
  address: "3400 stratford",
  full_name: {
    first_name: 'Timur',
    last_name: 'Meyster',
    initials: { a: 1, b: 2 }
  },
  email: 'timurtwin@aol.com'
  }

var turnMapToArray = function(queryMap) {
  return Object.keys(queryMap).reduce(function(arrKeyVal, key) {
    if(typeof queryMap[key] === 'object') {
      return arrKeyVal.concat([[key, turnMapToArray(queryMap[key])]]);
    } else {
      return arrKeyVal.concat([[encodeURIComponent(key), encodeURIComponent(queryMap[key])]]);
    }
  }, [])
}

var joinArrayStrings = function(kvPairList) {

  return kvPairList.map(function(arrayItem) {
    var key = encodeURIComponent(arrayItem[0].map(addBrackets).join(""));
    var value = encodeURIComponent(arrayItem[1]);
    return [key, value].join("=");
  })
}

var addBrackets = function(el, idx) {
  return idx === 0 ? el : ("[" + el +"]")
}

var flattenKeys = function(kvNestedPairs, parentKey) {
  parentKey = parentKey || [];

  return kvNestedPairs.reduce(function(flattenKVPairs, pair) {
      var key = parentKey.concat(pair[0]);
      var value = pair[1];
      return flattenKVPairs.concat(
          (/*is leaf */typeof value === 'string') ?
            [[key, value]] : //this array gets unwrapped by concat
            flattenKeys(value, key) // returned value is an array of flaten kv pairs
      );
  },[])
}

var convertToQueryStr = function(arrayKeyValueStr) {
  return arrayKeyValueStr.join("&");
}

var util = require('util')
function dump(o) { console.log(util.inspect(o, false, /* infinite depth: */ null)) }

dump(convertToQueryStr(joinArrayStrings(flattenKeys(turnMapToArray(queryMap)))));
