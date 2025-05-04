import { z } from 'zod'

export const DeckSchema = z.object({
	id: z.number(),
	name: z.string().min(1)
})

export const CreateDeckSchema = DeckSchema.omit({ id: true })
