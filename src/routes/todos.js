const router = require('express').Router()
const todosController = require('../controllers/todos')
const auth = require('../utils/auth')

router.get('/user/:user', todosController.getTodosByUser)
router.post('/', auth, todosController.createTodo)
router.patch('/:id', auth, todosController.updateTodo)
router.delete('/:id', auth, todosController.deleteTodos)

module.exports = router