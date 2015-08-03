/*

Problem:
we are given an array of duplicat ids, our task is to find the id, that's unique

Array Ints    | in binary                      |unique Int |Number of uniqs
-----------------------------------------------------------------------------
1,2,3,3,1     | 01 ^ 10 ^ 11 ^ 11 ^ 01         | 10
1,1,2,2,3,3,4 | 4          | 1
1,1,2,2,3,3   | none       | 0


Known:
delivery_id_confirmation

Unknown:
uniq
*/

var unique_int = function(delivery_id_confirmation) {
  var unique_id = delivery_id_confirmation[0]
  var remaining_ids = delivery_id_confirmation.slice(1);

  for(key in remaining_ids) {
    unique_id ^= remaining_ids[key]
  }

  return unique_id;
}

console.log(unique_int([1,2,3,3,1]))
