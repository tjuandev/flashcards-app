import z from 'zod'

export const CardSchema = z.object({
	id: z.number(),
	deck_id: z.number(),
	front: z.string(),
	back: z.string()
})

export const CreateCardSchema = CardSchema.omit({ id: true })

export type Card = z.infer<typeof CardSchema>
