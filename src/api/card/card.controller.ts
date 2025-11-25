import type { RequestHandler } from 'express'
import { ERROR_MESSAGES } from './card.constants.ts'
import { createCardByDeckId, findCardsByDeckId } from './card.repository.ts'

export const handleCreateCardByDeckId: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { rows } = await createCardByDeckId({
			...req.body,
			deck_id: req.params.deckId
		})
		return res.status(201).json({ data: rows })
	} catch (error) {
		next(error)
		res.status(400).json({ message: ERROR_MESSAGES.CARD_CREATION })
	}
}

export const handleGetCardsByDeckId: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { rows } = await findCardsByDeckId(req.params.deckId)
		res.json({ data: rows }).status(200)
	} catch (error) {
		console.error(error)
		res.status(404).json({ message: ERROR_MESSAGES.CARD_NOT_FOUND })
		next(error)
	}
}
