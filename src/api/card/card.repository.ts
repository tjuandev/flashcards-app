import { pool } from '#src/config/db.ts'
import type { CardModel, UpdateCardBody } from './card.types.ts'
import {
	CreateCardSchema,
	DeleteCardSchema,
	UpdateCardSchema
} from './card.validator.ts'

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

export async function deleteCardById(id: string) {
	DeleteCardSchema.parse(id)
	return await pool.query('DELETE FROM cards WHERE id = $1', [id])
}

export async function updateCardById(card: UpdateCardBody) {
	UpdateCardSchema.parse(card)
	console.log(card)
	const { back = null, front = null, id } = card || {}
	return await pool.query(
		`
			UPDATE cards
			SET front = COALESCE($1, front),
					back = COALESCE($2, back)
			WHERE id = $3
			RETURNING *
		`,
		[front, back, id]
	)
}
