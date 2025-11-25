import { pool } from '#src/config/db.ts'
import type { CardModel } from './card.types.ts'
import { CreateCardSchema } from './card.validator.ts'

export async function createCardByDeckId(card: CardModel) {
	CreateCardSchema.parse(card)
	return await pool.query(
		'INSERT INTO cards(front, back, deck_id) VALUES($1, $2, $3) RETURNING *',
		[card.front, card.back, card.deck_id]
	)
}

export async function findCardsByDeckId(deckId: string) {
	return await pool.query('SELECT * FROM cards WHERE deck_id = $1', [deckId])
}
