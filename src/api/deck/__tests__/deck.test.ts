import request from '#testHelpers/request.ts'
import { SUCCESS_MESSAGES } from '../deck.constants.ts'

describe('Route: /deck', () => {
	it('should return a list of decks', async () => {
		const response = await request.get('/deck')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			message: 'ss',
			rows: expect.any(Array)
		})
	})

	it('should create an deck', async () => {
		const response = await request.post('/deck').send({ name: 'Test Deck' })
		expect(response.status).toBe(201)
		expect(response.body).toEqual({
			message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS
		})
	})
})
