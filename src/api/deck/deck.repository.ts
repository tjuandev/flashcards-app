import type { z } from 'zod'
import { pool } from '#src/config/db.ts'
import { CreateDeckSchema, type DeckSchema } from './deck.validator.ts'

type Deck = z.infer<typeof DeckSchema>

// TODO: Remove this once we have a authentication feature
const MOCKED_USER_ID = '0e7725d1-24d5-4241-9ff1-38b03d02e20e'

export async function createDeck(name: Deck['name']) {
	CreateDeckSchema.parse({ name })
	return await pool.query('INSERT INTO decks(name, user_id) VALUES($1, $2)', [
		name,
		MOCKED_USER_ID
	])
}

export async function findAllDecks() {
	return await pool.query('SELECT * FROM decks')
}
