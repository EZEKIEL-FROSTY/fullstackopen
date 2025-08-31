
// import http from 'http' 
//const http = require('http') //--> imports Node's built in web server module

const express = require('express')
const app = express()

app.use(express.static('dist'))

let notes = [
    {
        id : "1",
        content : "HTML is easy",
        important : true
    },
    {
        id : "2",
        content : "Browser can execute only Javascript",
        important : false
    },
    {
        id : "3",
        content : "GET and POST are the most important methods of HTTP protocol",
        important : true
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// JSON.stringify(person) --> takes and obj and returns a string version of it
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// use the : syntax to define parameters for routes in Express
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => {
        return note.id === id
    })
    if(note)
    {
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateID = () => {
    const maxID = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxID + 1)
}

app.post('/api/notes', (request, response) => { 
    const body = request.body
    
    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content : body.content,
        important : body.important || false,
        id : generateID(),
    }

    notes = notes.concat(note)
    response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const note = notes.find(n => n.id === id)
  if (!note) {
    return response.status(404).end()
  }

  const updatedNote = { ...note, important: body.important }

  notes = notes.map(n => n.id !== id ? n : updatedNote)

  response.json(updatedNote)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})