import { pool } from '#src/config/db.ts'

// TODO: Remove this once we have an authentication feature
const MOCKED_USER_ID = '36ca3552-48b6-4f48-a7dc-8ae11c352412'

export async function createDeck(name: string) {
	return await pool.query('INSERT INTO decks(name, user_id) VALUES($1, $2)', [
		name,
		MOCKED_USER_ID
	])
}

export async function findAllDecks() {
	return await pool.query('SELECT * FROM decks')
}
