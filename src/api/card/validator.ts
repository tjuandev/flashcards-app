import z from 'zod'

export const CardSchema = z.object({
	id: z.string().uuid(),
	deck_id: z.string().uuid(),
	front: z.string(),
	back: z.string(),
	last_review: z.string().datetime().optional(),
	created_at: z.string().datetime().optional(),
	review_count: z.number().int().optional()
})

export const CreateCardSchema = CardSchema.pick({
	front: true,
	back: true,
	deck_id: true
})

export const UpdateCardSchema = CardSchema.pick({
	front: true,
	back: true,
	deck_id: true,
	id: true
}).extend({
	front: z.string().optional(),
	back: z.string().optional(),
	deck_id: z.string().uuid().optional()
})
