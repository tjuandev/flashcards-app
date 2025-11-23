import request from '#testHelpers/request.ts'
import { SUCCESS_MESSAGES } from '../card.constants.ts'
import * as cardModel from '../card.repository.ts'

const CARDS_LIST = vi.hoisted(() => [
	{
		id: 1,
		deck_id: 'b3dd501d-19dc-4115-806a-86388e5ea3c4',
		front: 'Front 1',
		back: 'Back 1'
	},
	{
		id: 2,
		deck_id: 'b3dd501d-19dc-4115-806a-86388e5ea3c4',
		front: 'Front 2',
		back: 'Back 2'
	}
])

vi.mock('../card.repository.ts', () => ({
	createCard: vi.fn().mockResolvedValue({ rows: [CARDS_LIST[1]] }),
	findAllCards: vi.fn().mockResolvedValue({ rows: CARDS_LIST })
}))

describe('Route: /card', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should return a list of cards', async () => {
		const response = await request.get('/card')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			message: SUCCESS_MESSAGES.CARDS_LISTED,
			data: CARDS_LIST
		})
		expect(cardModel.findAllCards).toHaveBeenCalled()
	})

	it('should create a card', async () => {
		const newCard = {
			deck_id: 'b3dd501d-19dc-4115-806a-86388e5ea3c4',
			front: 'Front 2',
			back: 'Back 2'
		}
		const response = await request.post('/card').send(newCard)
		expect(response.status).toBe(201)
		expect(response.body).toEqual({
			message: SUCCESS_MESSAGES.CARD_CREATION,
			data: [CARDS_LIST[1]]
		})
		expect(cardModel.createCard).toHaveBeenCalledWith(
			expect.objectContaining(newCard)
		)
	})
})
