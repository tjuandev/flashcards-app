import request from '#testHelpers/request.ts'
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
	createCardByDeckId: vi.fn().mockResolvedValue({ rows: [CARDS_LIST[1]] }),
	findCardsByDeckId: vi.fn().mockResolvedValue({ rows: CARDS_LIST })
}))

const DECK_ID = 'b3dd501d-19dc-4115-806a-86388e5ea3c4'

describe('Route: /cards', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should return a list of cards', async () => {
		const response = await request.get(`/cards/${DECK_ID}`)
		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			data: CARDS_LIST
		})
		expect(cardModel.findCardsByDeckId).toHaveBeenCalledWith(DECK_ID)
	})

	it.skip('should create a card', async () => {
		const newCard = {
			front: 'Front 2',
			back: 'Back 2'
		}
		const response = await request.post(`/cards/${DECK_ID}`).send(newCard)
		expect(response.status).toBe(201)
		expect(response.body).toEqual({
			data: [CARDS_LIST[1]]
		})
		expect(cardModel.createCardByDeckId).toHaveBeenCalledWith(
			expect.objectContaining({
				...newCard,
				deck_id: DECK_ID
			})
		)
	})
})
