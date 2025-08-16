/* Map
Goes through the array but doesnt throw the item away insteaed transforms them
*/

var animals = [
    {name : 'Frosty', species : 'cat'},
    {name : 'Sunshine', species : 'rat'},
    {name : 'Bisque', species : 'dog'}
]

// get name of all animals

// iterative solution
/*var names = []
for(var i = 0; i < animals.length; i++)
{
    names.push(animals[i].name)
}*/

// map --> expects a callback function to return a transformed object that will be added to the new array
var names = animals.map((animal) => {
    return animal.name + ' is a ' + animal.species
})
console.log(names);
