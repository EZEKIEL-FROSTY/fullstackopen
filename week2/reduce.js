import fs from 'fs'
import { json } from 'stream/consumers'
// reduce can be used to express any list transformations

var orders = [
    {amount : 250},
    {amount : 122},
    {amount : 326},
    {amount : 192}
]

var totalAmount = orders.reduce((sum, order) => {
    //console.log('hello', sum, order)
    return sum + order.amount
}, 0) // 0 is the first argument passed into the callback func
// 0 is our start point

//console.log(totalAmount)

var output = fs.readFileSync('data.txt', 'utf8')
.trim()
.split(/\r?\n/)
.map(line => line.split(/\s+/))
.reduce((customers, line) => {
    customers[line[0]] = customers[line[0]] || [] // if exist dont overwrite
    customers[line[0]].push({
        name : line[2],
        price : line[3],
        quantity : line[4]
    })
    return customers
}, {})
console.log('output', JSON.stringify(output, null, 2)) 
