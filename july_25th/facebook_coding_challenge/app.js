// input:[
//   {start: 560, end: 620},
//    {start: 160, end: 170},
//    {start: 130, end: 165},
//    {start: 180, end: 340},
//    {start: 230, end: 400},
//    {start: 30, end: 150},
//    {start: 540, end: 600},
//    {start: 610, end: 670},
//    {start: 570, end: 600}
//    ]
//
//
// output: [ [ { start: 30, end: 150 },
//     { start: 130, end: 165 },
//     { start: 160, end: 170 } ],
//   [ { start: 180, end: 340 }, { start: 230, end: 400 } ],
//   [ { start: 540, end: 600 },
//     { start: 570, end: 600 },
//     { start: 560, end: 620 },
//     { start: 610, end: 670 } ] ]


var eventGroups = function(/*List<Records>*/events) {/*List<List<records>>*/
    // var sortedEvents = events.sort(function(a, b) { return a.start - b.start });
    var sortedEvents = events.sort(function(a, b) { return a.end - b.end });
    var events = [
      [sortedEvents[0]]
    ];

    var eventListLength = sortedEvents.length;

    for(var i=0; i<eventListLength-1; i++) {
      var lastEvent = events.length;

      if(sortedEvents[i].end < sortedEvents[i+1].start) {
        var lastAddedEvent = events[lastEvent-1];

        events.push([sortedEvents[i+1]])
      } else {
        var lastAddedEvent = events[lastEvent-1];
        lastAddedEvent.push(sortedEvents[i+1])
      }
    }
    return events;
}

// input: [
      // [ { start: 30, end: 150 },
//     { start: 130, end: 165 },
//     { start: 160, end: 170 } ],
//   [ { start: 180, end: 340 }, { start: 230, end: 400 } ],
//   [ { start: 540, end: 600 },
//     { start: 570, end: 600 },
//     { start: 560, end: 620 },
//     { start: 610, end: 670 } ] ]

// output: [
//   [
//     [ { start: 30, end: 150 }, { start: 160, end: 170 } ],
//     [ { start: 130, end: 165 } ]
//     ],
//   [
//     [ { start: 180, end: 340 } ],
//     [ { start: 230, end: 400 } ]
//     ],
//   [
//     [ { start: 540, end: 600 }, { start: 610, end: 670 } ],
//     [ { start: 570, end: 600 } ],
//     [ { start: 560, end: 620 } ]
//     ]
//     ]


var eventsPlaceColumns = function(/*List<List<records>>*/eventGroups) {

  return eventGroups.reduce(function(grouped, events) {
    return grouped.concat([parseEvents(events)]);
  }, [])
}

var parseEvents = function(/*list<records>*/events) {

  return events.reduce(function(parsedEvents, event) {
    if(parsedEvents.length === 0) {
      return parsedEvents.concat([[event]]);
    }else {
      return addEventsToColumns(parsedEvents, event);
    }
  },[])
}

var addEventsToColumns = function(parsedEvents, event) {
  var addedEvent = false;
  parsedEvents = parsedEvents.map(function(list) {
    if(parsedEventsOverlaps(list, event) || addedEvent) {
      return list;
    } else {
      addedEvent = true;
      return list.concat([event]);
    }
  })
  return !addedEvent ? parsedEvents.concat([[event]]) : parsedEvents;
}

var parsedEventsOverlaps = function(parsedEvents, event) {
  var eventsLength = parsedEvents.length;
  return parsedEvents[eventsLength-1].end > event.start
}

/*
input: [
  [ //Group 1
    [ { start: 30, end: 150 }, { start: 160, end: 170 } ], //Column 1
    [ { start: 130, end: 165 } ] //column 2
  ],
  [ //Group 2
    [ { start: 180, end: 340 } ], [ { start: 230, end: 400 } ] //Column 1
    ],
  [ //Group 3
    [ { start: 540, end: 600 }, { start: 610, end: 670 } ], //Column 2
    [ { start: 560, end: 620 } ]
  ]
    ]

output: [
  [ //Group 1
    [ { start: 30, end: 150, width: 300, left: 0 }, { start: 160, end: 170, width: 300, left: 0 } ], //Column 1
    [ { start: 130, end: 165, width: 300, left: 300 } ] //column 2
  ],
  [ //Group 2
    [ { start: 180, end: 340, width: 300}, left: 0  ],
    [ { start: 230, end: 400, width: 300, left: 300} ] //Column 2
    ],
  [ //Group 3
    [ { start: 540, end: 600, width: 300, left: 0 }, { start: 610, end: 670, width: 300, left: 0 } ], //Column 1
    [ { start: 560, end: 620, width: 300, left: 300  } ] //Column2
  ]
    ]

*/
var addWidthAndLeftMarginToEvents = function(/*List<list<list<Records>>>>*/ eventsGroups) { /*List<list<list<Records>>>>*/
  return eventsGroups.reduce(function(groupsWithWidthAndMargin, group) {
    var numColumns = group.length;
    var containerWidth = 600;
    var height = 720;
    var pixelsPerMinute = 720 / (12 * 60)
    var width = containerWidth / numColumns;

    return groupsWithWidthAndMargin.concat(
      [group.reduce(function(eventsWithWidthandMargin, events, idx) {
        var leftMargin = width * idx;
        return eventsWithWidthandMargin.concat([
            events.map(function(event) {
            event.top = event.start * pixelsPerMinute
            event.height = ((event.end - event.start) * pixelsPerMinute)
            event.width = width;
            event.left = leftMargin;
            return event;
          })
        ]);
    },[])
      ]);
  }, [])
}

var flattenEvents = function(/*List<list<list<Records>>>>*/ eventsGroups) { /*list<Records>*/
  return eventsGroups.reduce(function(flattened, el) {
    if(Array.isArray(el)) {
      return flattened.concat(flattenEvents(el));
    } else {
      return flattened.concat(el);
    }
  }, [])
}




events = [
  {start: 560, end: 620},
   {start: 160, end: 170},
   {start: 130, end: 165},
   {start: 180, end: 340},
   {start: 230, end: 400},
   {start: 30, end: 150},
   {start: 540, end: 600},
   {start: 610, end: 670},
   {start: 570, end: 600}
   ]

var util = require('util')
function dump(o) { console.log(util.inspect(o, false, /* infinite depth: */ null)) }

// console.log(flattenEvents(addWidthAndLeftMarginToEvents(eventsPlaceColumns(eventGroups(events)))));
dump(eventsPlaceColumns(eventGroups(events)));
// dump(eventGroups(events));
// dump(eventGroups(events));
