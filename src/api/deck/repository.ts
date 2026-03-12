import { pool } from '#src/config/db.ts'
import type { DeckIdParam } from './types.ts'

// TODO: Remove this once we have an authentication feature
const MOCKED_USER_ID = '36ca3552-48b6-4f48-a7dc-8ae11c352412'

export async function createDeck(name: string) {
	return await pool.query(
		'INSERT INTO decks(name, user_id) VALUES($1, $2) RETURNING *',
		[name, MOCKED_USER_ID]
	)
}

export async function findAllDecks() {
	return await pool.query('SELECT * FROM decks')
}

export async function getReviewsCount(id: DeckIdParam['id'], limit = 20) {
	return await pool.query<{ review_count: number }>(
		`
			SELECT COUNT(*) FROM (
				SELECT 1 FROM cards
				WHERE last_review > CURRENT_DATE
				AND deck_id = $1
				LIMIT $2
			) AS limited_cards
		`,
		[id, limit]
	)
}
