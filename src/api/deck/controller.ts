import type { RequestHandler } from 'express'
import type { DefaultResponse } from '#src/types/api/response.ts'
import { SUCCESS_MESSAGES } from './constants.ts'
import { createDeck as createDeckModel, findAllDecks } from './repository.ts'
import type { CreateDeck } from './types.ts'
import { CreateDeckSchema } from './validator.ts'

export const handleCreateDeck: RequestHandler<
	unknown,
	DefaultResponse,
	CreateDeck.Body
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

export const handleGetDecks: RequestHandler<unknown, DefaultResponse> = async (
	_req,
	res,
	next
) => {
	try {
		const { rows } = await findAllDecks()
		res
			.status(200)
			.json({ message: SUCCESS_MESSAGES.DECKS_LISTED_SUCCESS, data: rows })
	} catch (error) {
		next(error)
	}
}
