import type { z } from 'zod'
import { pool } from '#src/config/db.ts'
import { CreateDeckSchema, type DeckSchema } from './deck.validator.ts'

type DeckType = z.infer<typeof DeckSchema>

export async function createDeck(name: DeckType['name']) {
	CreateDeckSchema.parse({ name })
	return await pool.query('INSERT INTO decks(name) VALUES($1)', [name])
}

export async function findAllDecks() {
	return await pool.query('SELECT * FROM decks')
}
