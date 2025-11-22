import { z } from 'zod'

export const DeckSchema = z.object({
	id: z.number(),
	userId: z.string().uuid(),
	name: z.string().min(1)
})

export const CreateDeckSchema = DeckSchema.omit({ id: true, userId: true })
