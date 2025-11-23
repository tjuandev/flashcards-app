import type { RequestHandler } from 'express'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './card.constants.ts'
import {
	createCard as createCardModel,
	findAllCards
} from './card.repository.ts'

export const createCard: RequestHandler = async (req, res, next) => {
	try {
		const { rows } = await createCardModel(req.body)
		return res
			.status(201)
			.json({ message: SUCCESS_MESSAGES.CARD_CREATION, data: rows })
	} catch (error) {
		next(error)
		res.status(400).json({ message: ERROR_MESSAGES.CARD_CREATION })
	}
}

export const getDecks: RequestHandler = async (_req, res, next) => {
	try {
		const { rows } = await findAllCards()
		res.json({ message: SUCCESS_MESSAGES.CARDS_LISTED, data: rows }).status(200)
	} catch (error) {
		console.error(error)
		res.status(404).json({ message: ERROR_MESSAGES.CARD_NOT_FOUND })
		next(error)
	}
}
