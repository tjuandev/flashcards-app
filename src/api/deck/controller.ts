import type { RequestHandler } from 'express'
import { SUCCESS_MESSAGES } from './constants.ts'
import { createDeck as createDeckModel, findAllDecks } from './repository.ts'
import type { CreateDeckBody } from './types.ts'
import { CreateDeckSchema } from './validator.ts'

export const handleCreateDeck: RequestHandler<
	unknown,
	unknown,
	CreateDeckBody
> = async (req, res, next) => {
	try {
		const deck = CreateDeckSchema.parse(req.body)
		const { rows } = await createDeckModel(deck.name)

		res
			.status(201)
			.json({ message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS, data: rows })
	} catch (error) {
		next(error)
	}
}

export const handleGetDecks: RequestHandler = async (_req, res, next) => {
	try {
		const { rows } = await findAllDecks()
		res
			.status(200)
			.json({ message: SUCCESS_MESSAGES.DECKS_LISTED_SUCCESS, data: rows })
	} catch (error) {
		next(error)
	}
}
