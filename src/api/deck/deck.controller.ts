import type { NextFunction, Request, Response } from 'express'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './deck.constants.ts'
import { createDeck as createDeckModel, findAllDecks } from './deck.model.ts'

export const createDeck = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { rows } = await createDeckModel(req.body.name)

		res
			.status(201)
			.json({ message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS, data: rows })
	} catch (error) {
		res.status(400).json({
			message: ERROR_MESSAGES.DECK_CREATION_FAILED
		})
		next(error)
	}
}

export const getDecks = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { rows } = await findAllDecks()
		res
			.json({ message: SUCCESS_MESSAGES.DECKS_LISTED_SUCCESS, data: rows })
			.status(200)
	} catch (error) {
		res.status(404).json({ message: ERROR_MESSAGES.DECK_NOT_FOUND })
		next(error)
	}
}
