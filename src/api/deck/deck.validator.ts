import { z } from 'zod'

export const DeckSchema = z.object({
	id: z.number(),
	user_id: z.string().uuid(),
	name: z.string().min(1)
})

export const CreateDeckSchema = DeckSchema.omit({ id: true, user_id: true })
