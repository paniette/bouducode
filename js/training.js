const persons = [
    { id: 1, name: 'Item 1', age:18, category: 'Category A', boutdecode:''},
    { id: 2, name: 'Item 2', age:18, category: 'Category B' , boutdecode:''},
    { id: 3, name: 'Item 3', age:32, category: 'Category A' , boutdecode:''}
];
const personSet = new Set(persons);

const personMap = new Map(personSet)
console.log("personset",personSet);

console.log("personMap",personMap)

