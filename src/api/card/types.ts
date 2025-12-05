import type z from 'zod'
import type {
	CardSchema,
	CreateCardSchema,
	UpdateCardSchema
} from './validator.ts'

export type Card = z.infer<typeof CardSchema>

export type DeckIdParam = { deckId: string }
export type CardIdParam = { id: string }

export type CreateCardBody = z.infer<typeof CreateCardSchema>
export type UpdateCardBody = z.infer<typeof UpdateCardSchema>
