//import all packages
import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'

//app instance
const app = express()

//define port
const port = 8000

//setup middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

ViteExpress.config({printViteDevServerHost: true})


//test data goes here
let myId = 4
const testdata = [
    {id:0, name: "hellen", age: "12/4/1995", certification: "level-3"}, {id:1, name: "trey", age: "8/14/1993", certification: "level-3"}, {id:2, name: "aeneas", age: "10/4/1997", certification: "level-3"},{id:3, name: "bob", age: "12/4/1965", certification: "level-3"}

]


//routes go here
app.get('/api/instructors', (req, res) => {
    res.json(testdata)
})

app.post('/api/instructor', (req, res) => {
    const {description} = req.body

    const instructorRow = {
        id: myId,
        bio: description || 'scription',
        certification: ''
    }

    testdata.push(instructorRow)
    myId += 1

    res.json(instructorRow)
})

app.post('/api/instructor/delete/:id', (req, res) => {
    //grab id from params
    //locate which index in test data matches
    //splice out that index
    //return the id to the front end

    const {id} = req.params
    const index = testdata.findIndex((el) => el.id === +id)

    if (index === -1) {
        res.status(404).json({error: `item with id ${id} was not found`})
    } else {
        testdata.splice(index, 1)
        res.json({id: +id})
    }

    
})


app.post('/api/instructor/:id', (req, res) => {

    const {id} = req.params
    const {certification, bio, location} = req.body
    const index = testdata.findIndex((el) => el.id === +id)
    
    const item = testdata[index]

    if(certification) {
        item.certification = certification ?? item.certification
    }
    if(bio) {
        item.bio = bio ?? item.bio
    }
    if(location) {
        item.location = location ?? item.location
    }

    res.json(item)

})


//open up server
ViteExpress.listen(app, port, () => console.log(`autobots roll out on http://localhost:${port}`))

