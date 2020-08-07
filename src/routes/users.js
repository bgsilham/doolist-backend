const router = require('express').Router()
const usersController = require('../controllers/users')
const auth = require('../utils/auth')

router.get('/', usersController.getAllUsers)
router.post('/login', usersController.loginUser)
router.post('/', usersController.createUser)
router.get('/:id', usersController.getIdUser)
router.delete('/:id', auth, usersController.deleteUser)

module.exports = router
