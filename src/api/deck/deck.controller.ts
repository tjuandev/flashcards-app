import type { RequestHandler } from 'express'
import { SUCCESS_MESSAGES } from './deck.constants.ts'
import {
	createDeck as createDeckModel,
	findAllDecks
} from './deck.repository.ts'
import { CreateDeckSchema } from './deck.validator.ts'

export const createDeck: RequestHandler = async (req, res, next) => {
	try {
		const validatedData = CreateDeckSchema.parse(req.body)
		const { rows } = await createDeckModel(validatedData.name)

		res
			.status(201)
			.json({ message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS, data: rows })
	} catch (error) {
		next(error)
	}
}

export const getDecks: RequestHandler = async (_req, res, next) => {
	try {
		const { rows } = await findAllDecks()
		res
			.status(200)
			.json({ message: SUCCESS_MESSAGES.DECKS_LISTED_SUCCESS, data: rows })
	} catch (error) {
		next(error)
	}
}
