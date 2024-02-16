import vine from '@vinejs/vine'

export const createRecipeValidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(50),
        ingredients: vine.string().maxLength(500),
        preparation: vine.string().maxLength(500),
        photo: vine.file({extnames: ['jpg', 'png']}),
        user: vine.number()
    })
)

export const updateRecipeValidator = vine.compile(
    vine.object({
        title: vine.string().maxLength(50).optional(),
        ingredients: vine.string().maxLength(500).optional(),
        preparation: vine.string().maxLength(500).optional()
    })
)