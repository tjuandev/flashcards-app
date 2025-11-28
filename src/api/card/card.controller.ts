import type { RequestHandler } from 'express'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './card.constants.ts'
import {
	createCardByDeckId,
	deleteCardById,
	findCardsByDeckId,
	updateCardById
} from './card.repository.ts'
import type { UpdateCardBody } from './card.types.ts'

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

export const handleDeleteCard: RequestHandler = async (req, res, next) => {
	try {
		await deleteCardById(req.params.cardId)
		res.json({ message: SUCCESS_MESSAGES.CARD_DELETION_SUCCESS }).status(200)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: ERROR_MESSAGES.CARD_DELETION })
		next(error)
	}
}

export const handleUpdateCard: RequestHandler<
	{ id: string },
	unknown,
	UpdateCardBody
> = async (req, res, next) => {
	const { id } = req.params
	if (!id) {
		return res.status(400).json({ message: ERROR_MESSAGES.CARD_ID_REQUIRED })
	}

	try {
		const { rows } = await updateCardById({
			...req.body,
			id
		})

		if (rows.length === 0) {
			return res.status(404).json({ message: ERROR_MESSAGES.CARD_NOT_FOUND })
		}

		res.json({ data: rows }).status(200)
	} catch (error) {
		console.error(error)
		res.status(400).json({ message: ERROR_MESSAGES.CARD_UPDATE_FAILED })
		next(error)
	}
}
