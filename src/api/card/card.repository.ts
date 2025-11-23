import { pool } from '#src/config/db.ts'
import { type Card, CreateCardSchema } from './card.validator.ts'

// TODO: Remove when dynamically pass DECK_ID
const MOCK_DECK_ID = 'b3dd501d-19dc-4115-806a-86388e5ea3c4'
export async function createCard(card: Card) {
	CreateCardSchema.parse(card)
	return await pool.query(
		'INSERT INTO cards(front, back, deck_id) VALUES($1, $2, $3)',
		[card.front, card.back, MOCK_DECK_ID]
	)
}

export async function findAllCards() {
	return await pool.query('SELECT * FROM cards')
}
