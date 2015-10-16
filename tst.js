'use strict'

var preparePoliticians = require('./lib/preparePoliticians')
var updateItems = require('./lib/updateItems')
var unwrapPoliticians = require('./lib/unwrapPoliticians')
var writeToFile = require('./lib/writeToFile')
var politicians = require('./data/politicians.json')
var committees = require('./data/politiciansCommittee.json')
var options = {
  storagePath: 'data'
}
var indexedObject = preparePoliticians({
  list: politicians,
  keyField: 'recno'
})
var updatedObject = updateItems({
  list: committees,
  keyField: 'recno',
  indexedObject: indexedObject
})

var unwrappedList = unwrapPoliticians(updatedObject)

var files = [
  {
    fileName: 'mergedData.json',
    data: unwrappedList
  }
]

options.files = files

writeToFile(options, function (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})

console.log('Finished')
