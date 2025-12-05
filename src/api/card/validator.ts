import z from 'zod'

export const CardSchema = z.object({
	id: z.string().uuid(),
	deck_id: z.string().uuid(),
	front: z.string(),
	back: z.string()
})

export const CreateCardSchema = CardSchema.omit({ id: true, deck_id: true })

export const DeleteCardSchema = CardSchema.pick({ id: true }).required()

export const UpdateCardSchema = CardSchema.omit({ deck_id: true }).extend({
	front: z.string().optional(),
	back: z.string().optional()
})
