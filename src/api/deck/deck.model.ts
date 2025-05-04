import type { z } from 'zod'
import type { DeckSchema } from './deck.validator.ts'

export type Deck = z.infer<typeof DeckSchema>

export const decks: Deck[] = []
