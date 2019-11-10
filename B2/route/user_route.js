let express = require('express')
let route = express.Router()
let helper = require('../helper/prepareData')
let userAction = require('../helper/user')

route.post('/add', (req, res) => {
    let user = req.body
    helper.prepareData(user) 
    userAction.checkExistAndAdd(user) == -1 ? res.redirect('/') : res.json({'error' : 'Username đã tồn tại'}) 
})

route.get('/delete', (req, res) => {
    let username = req.query.username
    userAction.deleteUserFromUsername(username, () =>  res.redirect('/')) 
})

route.post('/edit', (req, res) => {
    user = req.body
    helper.prepareData(user)
    userAction.editUserFromUsername(user, () => res.redirect('/'))
})

module.exports = route