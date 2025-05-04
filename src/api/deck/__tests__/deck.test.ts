import request from '#testHelpers/request.ts'
import { decks } from '../deck.model.ts'

describe('Route: /deck', () => {
	it('should return a list of decks', async () => {
		const response = await request.get('/deck')
		expect(response.status).toBe(200)
		expect(decks).toEqual(response.body)
	})

	it('should create an deck', async () => {
		const response = await request.post('/deck').send({ name: 'Test Deck' })
		expect(response.status).toBe(201)
		expect(response.body).toEqual({ id: expect.any(Number), name: 'Test Deck' })
	})
})
