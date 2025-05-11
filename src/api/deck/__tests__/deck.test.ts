import request from '#testHelpers/request.ts'
import { SUCCESS_MESSAGES } from '../deck.constants.ts'
import { Deck } from '../deck.model.ts'

const DECKS_LIST = [
	{ id: 1, name: 'Test Deck' },
	{ id: 2, name: 'Test Deck 2' }
]

vi.mock('../deck.model.ts', () => ({
	Deck: vi.fn().mockImplementation(() => ({
		create: vi.fn().mockResolvedValue({ rows: DECKS_LIST[1] }),
		findAll: vi.fn().mockResolvedValue({ rows: DECKS_LIST })
	}))
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
		expect(Deck).toHaveBeenCalled()
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
		expect(Deck).toHaveBeenCalled()
	})
})
