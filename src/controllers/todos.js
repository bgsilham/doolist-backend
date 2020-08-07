const todoModel = require('../models/todos')
const qs = require('querystring')
const moment = require('moment')
const {APP_URL} = process.env

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 5
  }
}

const getNextLinkQueryString = (page, totalPage, currentQuery) => {
  page = parseInt(page)
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

const getPrevLinkQueryString = (page, currentQuery) => {
  page = parseInt(page)
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

module.exports = {
  createTodo: async (request, response) => {
    const { user, note } = request.body
    if (user && note && user !== '' && note !== '') {
      const todosData = {
        user,
        note,
        created_at: moment().format('LLLL')
      }
      const result = await todoModel.createTodos(todosData)
      if (result) {
        const data = {
          success: true,
          msg: 'todo succesfully created!',
          data: todosData
        }
        response.status(201).send(data)
      } else {
        const data = {
          success: false,
          msg: 'Failed to create todo',
          data: request.body
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'all form must be filled'
      }
      response.status(400).send(data)
    }
  },
  getTodosByUser: async (request, response) => {
    const { user } = request.params
    const {search, sort, page, limit} = request.query
    const condition = {
      search,
      sort
    }

    const totalData = await todoModel.getTodosCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

    const fetchTodo = await todoModel.getTodosByUser({ user: parseInt(user) }, condition, sliceStart, sliceEnd)
    const data = {
      success: true,
      msg: 'Success',
      data: fetchTodo,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        nextLink: nextLink && `${process.env.APP_URL}/todos?${nextLink}`,
        prevLink: prevLink && `${process.env.APP_URL}/todos?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  updateTodo: async (request, response) => {
    const { id } = request.params
    const { note } = request.body
    const fetchTodo = await todoModel.getTodosByCondition({ id: parseInt(id) })
    if (fetchTodo.length > 0) {
      if (note && note !== '') {
        const todoData = [
          { 
            note,
            created_at: moment().format('LLLL')
          },
          { id: parseInt(id) }
        ]
        const result = await todoModel.updateTodos(todoData)
        if (result) {
          const data = {
            success: true,
            msg: 'todo has been updated',
            data: todoData[0]
          }
          response.status(200).send(data)
        } else {
          const data = {
            success: false,
            msg: 'failed to update'
          }
          response.status(400).send(data)
        }
      }
    } else {
      const data = {
        success: false,
        msg: `todo with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteTodos: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const fetchTodo = await todoModel.getTodosByCondition(_id)
    if (fetchTodo.length > 0) {
      const result = await todoModel.deleteTodos(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Todo with id ${request.params.id} deleted`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'failed to delete'
        }
        response.status(200).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'Cannot delete data, todo not found'
      }
      response.status(400).send(data)
    }
  }
}