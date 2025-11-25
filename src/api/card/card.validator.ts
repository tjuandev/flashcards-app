import z from 'zod'

export const CardSchema = z.object({
	id: z.number(),
	deck_id: z.string().uuid(),
	front: z.string(),
	back: z.string()
})

export const CreateCardSchema = CardSchema.omit({ id: true })
