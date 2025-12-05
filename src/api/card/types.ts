import type z from 'zod'
import type {
	CardSchema,
	CreateCardSchema,
	UpdateCardSchema
} from './validator.ts'

export type Card = z.infer<typeof CardSchema>

export type DeckIdParam = { deckId: string }
export type CardIdParam = { id: string }
export namespace CreateCard {
	export type Body = z.infer<typeof CreateCardSchema>
}

export namespace UpdateCard {
	export type Body = z.infer<typeof UpdateCardSchema>
}
