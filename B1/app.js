let express = require('express')
let bodyParser = require('body-parser')
let User = require('./models/User')
let helper = require('./helper/prepareData')
let morgan = require('morgan')
let upload = require('./helper/upload')
let userAction = require('./helper/user')


let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/public', express.static(__dirname + '/public'))

users = []
user = new User('admin', 'phamnaminter@gmail.com',22, 1, [])
users.push(user)


app.post('/add', (req, res) => {
    let user = req.body
    helper.prepareData(user)
    userAction.checkExistAndAdd(user) == -1 ? res.redirect('/') : res.json({'error' : 'Username đã tồn tại'}) 
    // Kiểm tra nếu user không tồn tại add dữ liệu và trả về -1, ngược lại trả về index của user
})

app.get('/delete', (req, res) => {
    let username = req.query.username
    userAction.deleteUserFromUsername(username, () =>  res.redirect('/')) 
    //Su dung callback bởi res.redirect chạy nhanh hơn tốc độ xử lí để delete data
})

app.post('/edit', (req, res) => {
    user = req.body
    helper.prepareData(user)
    userAction.editUserFromUsername(user, () => res.redirect('/'))
})

app.route('/gallery')
    .get((req, res) => {
        let username = req.query.username
        let index = users.findIndex(item => item.username == username)
        res.render('gallery',{username, gallery : users[index].gallery})
1    })
    .post(upload.single('avatar'), (req, res) => {
        let index = users.findIndex(item => item.username == req.query.username)
        users[index].gallery.push(req.file)
        res.redirect(req.url)      
    })

    app.get('/api', (req, res) => {
    
        res.json(users)
    })

app.get('/gallery/delete', (req, res) => {
    let {username, filename} = req.query
    let indexUser = users.findIndex(item => item.username == username)
    let indexImage = users[indexUser].gallery.findIndex(item => item.filename == filename)
    users[indexUser].gallery.splice(indexImage, 1)
    res.redirect('/gallery?username=' + username)
})

app.get('*', (req, res) => {
    res.render('index', {users, req})
})


app.listen(3000, () => {
    console.log('Server is listening at port 3000')
})