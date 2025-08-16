// filter : accepts another func as its argument which it will use to return new filtered version of array
var animals = [
    {name : 'Frosty', species : 'Cat'},
    {name: 'Bisque', species : 'Cat'},
    {name : 'Sunshine', species : 'Cat'},
    {name : 'Fishy', species: 'Fish'}
]
/*
var fish = []
for(var i = 0; i < animals.length; i++)
{
    if(animals[i].species === 'Fish')
    {
        fish.push(animals[i])
    }
}*/

// filter loops through each item in the array
// passes each item into the callback function
// and will expect the callback func to return true or false

var isCat = function(animal) {
    return animal.species === 'Cat'
}
var cats = animals.filter(isCat) //  returns new filtered array
var notCats = animals.reject(isCat)