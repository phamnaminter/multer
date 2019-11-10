let express = require('express')
let route = express.Router()
let upload = require('../helper/upload')

route.route('/gallery')
    .get((req, res) => {
        let username = req.query.username
        let index = users.findIndex(item => item.username == username)
        res.render('gallery',{username, gallery : users[index].gallery, avatar: users[index].avatar})
    })

    .post(upload.single('avatar'), (req, res) => {
        let index = users.findIndex(item => item.username == req.query.username)
        users[index].gallery.push(req.file)
        res.redirect(req.url)      
    })

route.get('/gallery/delete', (req, res) => {
    let {username, filename} = req.query
    let indexUser = users.findIndex(item => item.username == username)
    let indexImage = users[indexUser].gallery.findIndex(item => item.filename == filename)
    users[indexUser].gallery.splice(indexImage, 1)
    res.redirect('/gallery?username=' + username)
})

route.get('/gallery/select-avatar', (req, res) => {
    let {username, filename} = req.query
    let indexUser = users.findIndex(item => item.username == username)
    let indexImage = users[indexUser].gallery.findIndex(item => item.filename == filename)
    indexImage != -1 ? users[indexUser].avatar = filename : res.json({'error' : "Can not find this file"})
    res.redirect('/gallery?username=' + username)
})

module.exports = route