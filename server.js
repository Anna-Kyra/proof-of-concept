//EXPRESS STUFF
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('port', process.env.PORT || 8001)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})


// BASIS ENDPOINTS
const apiUrl = 'https://fdnd-agency.directus.app/items'
const imagesData = await fetchJson(apiUrl + `/fabrique_art_objects/?fields=*,image.height,image.width,image.id`) 

// Shuffelen functie 
function shuffle(array) {       
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {      
        // Random index selecteren     
        let j = Math.floor(Math.random() * (i + 1));      
        // Items swappen     
        [array[i], array[j]] = [array[j], array[i]];   
    }   
}

// Variabelen voor je routes
const allImages = app.locals.storage = []; 
let currentIndex = 0
let offset = 0
const images = imagesData.data  
const sliced = images.slice(0, 22)

// ROUTES
app.get('/', function (request, response) {
    response.render('index', {
        current: '/en', 
        images
    })
})

app.post('/more', (request, response) => {   
    offset += 5 
    shuffle(images.slice(currentIndex, offset += 5))
    const sliced = images.slice(currentIndex, offset)
    if(offset >= images.length) { 
    } 
    response.render('index', {     
        images: sliced,
        current: '/en' 
    })  
})  

app.get('/ar', function (request, response) {  
    response.render('index', {
        current: '/ar', 
        images       
    })
})
