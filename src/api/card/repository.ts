import { pool } from '#src/config/db.ts'
import type {
	Card,
	CardIdParam,
	CreateCard,
	DeckIdParam,
	UpdateCard
} from './types.ts'

export async function createCardByDeckId(card: CreateCard.Body) {
	return await pool.query<Card>(
		'INSERT INTO cards(front, back, deck_id) VALUES($1, $2, $3) RETURNING *',
		[card.front, card.back, card.deck_id]
	)
}

export async function findCardsByDeckId(deck_id: DeckIdParam['deck_id']) {
	return await pool.query<Card[]>('SELECT * FROM cards WHERE deck_id = $1', [
		deck_id
	])
}

export async function deleteCardById(id: CardIdParam['id']) {
	return await pool.query<never>('DELETE FROM cards WHERE id = $1', [id])
}

export async function updateCardById(card: UpdateCard.Body) {
	const { back = null, front = null, id } = card || {}
	return await pool.query<Card>(
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
