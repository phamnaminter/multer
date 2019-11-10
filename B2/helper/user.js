module.exports = {
    checkExistAndAdd : (user) => {
        let index = users.findIndex(item => item.username == user.username)
        index == -1 && users.push(user)
        return index  
    },
    
    deleteUserFromUsername: (username, cb) => {
        let index = users.findIndex(item => item.username == username)
        index != -1 && users.splice(index, 1)
        cb()
    },
    editUserFromUsername: (user, cb) => {
        let index = users.findIndex(item => item.username == user.username)
        users[index].email = user.email 
        users[index].username = user.username 
        users[index].age = user.age 
        users[index].gender = user.gender 
        cb()
    }
}