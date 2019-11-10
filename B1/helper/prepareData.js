module.exports = {
    prepareData : (user) => {
        
        isNaN(Number(user.age)) ? user.age = 0 : user.age = user.age 
        user.age = Number(user.age)
        if (user.gender != 0 && user.gender != 1) {
            user.gender = 1
        }
        user.gallery = []
    }
}