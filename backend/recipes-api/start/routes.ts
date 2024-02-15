/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'

import RecipesController from '#controllers/recipes_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/users', [AuthController, 'createUser'])
router.post('/login', [AuthController, 'login'])
router.get('/logout', [AuthController, 'logout']).use(middleware.auth({guards: ['api']}))

router.get('/recipes', [RecipesController, 'index'])
router.post('/recipes', [RecipesController, 'store']).use(middleware.auth({guards: ['api']}))
router.get('/recipes/:id', [RecipesController, 'show']).use(middleware.auth({guards: ['api']}))
router.put('/recipes/:id', [RecipesController, 'update']).use(middleware.auth({guards: ['api']}))
router.delete('/recipes/:id', [RecipesController, 'destroy']).use(middleware.auth({guards: ['api']}))

//router.resource('/recipes', RecipesController)