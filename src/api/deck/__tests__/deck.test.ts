import request from '#testHelpers/request.ts'
import { SUCCESS_MESSAGES } from '../deck.constants.ts'
import * as deckModel from '../deck.repository.ts'

const DECKS_LIST = vi.hoisted(() => [
	{ id: 1, name: 'Test Deck' },
	{ id: 2, name: 'Test Deck 2' }
])

vi.mock('../deck.repository.ts', () => ({
	createDeck: vi.fn().mockResolvedValue({ rows: DECKS_LIST[1] }),
	findAllDecks: vi.fn().mockResolvedValue({ rows: DECKS_LIST })
}))

describe('Route: /deck', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should return a list of decks', async () => {
		const response = await request.get('/deck')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			message: SUCCESS_MESSAGES.DECKS_LISTED_SUCCESS,
			data: DECKS_LIST
		})
		expect(deckModel.findAllDecks).toHaveBeenCalled()
	})

	it('should create a deck', async () => {
		const response = await request
			.post('/deck')
			.send({ name: DECKS_LIST[1].name })
		expect(response.status).toBe(201)
		expect(response.body).toEqual({
			message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS,
			data: DECKS_LIST[1]
		})
		expect(deckModel.createDeck).toHaveBeenCalledWith(DECKS_LIST[1].name)
	})
})
