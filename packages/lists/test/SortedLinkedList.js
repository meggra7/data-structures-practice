const { getTestSet } = require('utilities/env');
const referenceImplementations = [
  require('../lib/sortedLinked/ReferenceSortedLinkedList')
];
const userImplementations = [
  require('../src/SortedLinkedList')
];
const testSortedListImplementation = require('./testSortedListImplementation');

xdescribe('Singly Linked', () => {
  getTestSet(userImplementations, referenceImplementations)
    .forEach(testSortedListImplementation)
});

