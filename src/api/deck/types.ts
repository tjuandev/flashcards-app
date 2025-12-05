import type z from 'zod'
import type { CreateDeckSchema, DeckSchema } from './validator.ts'

export type Deck = z.infer<typeof DeckSchema>

export type DeckIdParam = { id: string }

export type CreateDeckBody = z.infer<typeof CreateDeckSchema>
