import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { createUserValidator } from '#validators/user'
import { DateTime } from 'luxon'

export default class AuthController {
  public async createUser({ request, response }: HttpContext) {
    const data = request.only(['username', 'email', 'password'])
    const payload = await createUserValidator.validate(data)

    const checkEmail = await User.findBy('email', payload.email)
    if (checkEmail) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Email address is already used' }] })
    }

    await User.create({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      createdAt: DateTime.now(),
      updatedAt: null, // por algum motivo, isso ta salvando a data atual no database
    })

    return response.status(201)
  }

  public async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)
    return {
      user,
      token,
    }
  }

  public async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = user.currentAccessToken

    User.accessTokens.delete(user, token.identifier)
  }
}
