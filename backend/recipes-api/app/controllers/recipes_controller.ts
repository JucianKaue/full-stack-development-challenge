import type { HttpContext } from '@adonisjs/core/http'

import Recipe from '#models/recipe'
import { createRecipeValidator, updateRecipeValidator } from '#validators/recipe'
import { DateTime } from 'luxon'

export default class RecipesController {
    // GET /recipes
    public async index({ response }: HttpContext) {
        const recipes = await Recipe.all()

        return response.status(200).json({recipes: recipes})
    }

    // GET /recipes/:id
    public async show({ params, response }: HttpContext) {
        const { id } = params

        const recipe = await Recipe.findBy('id', id)

        if (!recipe) {
            return response.status(404)
        }
        return response.status(200).json({recipe: recipe})
        
    }

    // POST /recipes
    public async store( { request, auth }: HttpContext ) {
        const reqData = request.only(['title', 'ingredients', 'preparation'])

        const user = auth.getUserOrFail()

        const data = {
            title: reqData.title,
            ingredients: reqData.ingredients,
            preparation: reqData.preparation,
            photo_url: 'teste',
            user: user.id,
            createdAt: DateTime.now()
        }

        const payload = await createRecipeValidator.validate(data)
        Recipe.create(payload)

    }

    // PUT /recipes
    public async update({ params, auth, request, response }: HttpContext) {
        const { id } = params
        const user = auth.getUserOrFail()
        const data = request.only(['title', 'ingredients', 'preparation'])

        const recipe = await Recipe.findByOrFail('id', id)
        if (!(recipe.user == user.id)) {
            return response.status(401).json({"errors": [{"messsage": "Unauthorized"}]})
        }

        const payload = await updateRecipeValidator.validate(data)

        await Recipe.query().update({
            title: payload.title,
            ingredients: payload.ingredients,
            preparation: payload.preparation,
        })
        return response.status(200)
    }

    // DELETE /recipes
    public async destroy({ params, auth, response }: HttpContext) {
        const { id } = params
        const user = auth.getUserOrFail()

        const recipe = await Recipe.findByOrFail('id', id)

        if (recipe.user == user.id) {
            await Recipe.query().where('id', id).delete()
            return response.status(204)
        }
        

    }
}