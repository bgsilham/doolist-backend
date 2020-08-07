const router = require('express').Router()
const todosController = require('../controllers/todos')
const auth = require('../utils/auth')

router.get('/user/:user', todosController.getTodosByUser)
router.post('/', todosController.createTodo)
router.patch('/:id', todosController.updateTodo)
router.delete('/:id', todosController.deleteTodos)

module.exports = router