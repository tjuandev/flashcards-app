import type z from 'zod'
import type {
	CardSchema,
	CreateCardSchema,
	UpdateCardSchema
} from './card.validator.ts'

export type CardModel = z.infer<typeof CardSchema>

export type CreateCardBody = z.infer<typeof CreateCardSchema>
export type UpdateCardBody = z.infer<typeof UpdateCardSchema>
