let express = require('express')
let bodyParser = require('body-parser')
let User = require('./models/User')
let user_route = require('./route/user_route')
let gallery_route = require('./route/gallery_route')

let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'))

app.use(user_route)
app.use(gallery_route)

users = []
user = new User('admin', 'phamnaminter@gmail.com',22, 1, [], null)
users.push(user)

app.get('*', (req, res) => {
    res.render('index', {users, req})
})

app.listen(3000, () => {
    console.log('Server is listening at port 3000')
})