import type z from 'zod'
import type { CreateDeckSchema, DeckSchema } from './validator.ts'

export type Deck = z.infer<typeof DeckSchema>

export type DeckIdParam = { id: string }

export namespace CreateDeck {
	export type Body = z.infer<typeof CreateDeckSchema>
}
