import type { RequestHandler } from 'express'
import type { DefaultResponse } from '#src/types/api/response.ts'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants.ts'
import {
	createCardByDeckId,
	deleteCardById,
	findCardsByDeckId,
	updateCardById
} from './repository.ts'
import type {
	CardIdParam,
	CreateCard,
	DeckIdParam,
	UpdateCard
} from './types.ts'
import {
	CreateCardSchema,
	DeleteCardSchema,
	UpdateCardSchema
} from './validator.ts'

export const handleCreateCardByDeckId: RequestHandler<
	DeckIdParam,
	DefaultResponse,
	CreateCard.Body
> = async (req, res, next) => {
	try {
		const { deckId } = req.params
		const card = CreateCardSchema.parse(req.body)
		const { rows } = await createCardByDeckId(deckId, card)

		return res.status(201).json({ data: rows })
	} catch (error) {
		next(error)
	}
}

export const handleGetCardsByDeckId: RequestHandler<DeckIdParam> = async (
	req,
	res,
	next
) => {
	try {
		const { rows } = await findCardsByDeckId(req.params.deckId)
		res.status(200).json({ data: rows })
	} catch (error) {
		next(error)
	}
}

export const handleDeleteCard: RequestHandler<
	CardIdParam,
	DefaultResponse
> = async (req, res, next) => {
	const { id } = req.params

	if (!id) {
		return res.status(400).json({ message: ERROR_MESSAGES.CARD_ID_REQUIRED })
	}

	try {
		DeleteCardSchema.parse({ id })
		await deleteCardById(id)
		res.status(200).json({ message: SUCCESS_MESSAGES.CARD_DELETION_SUCCESS })
	} catch (error) {
		next(error)
	}
}

export const handleUpdateCard: RequestHandler<
	CardIdParam,
	DefaultResponse,
	UpdateCard.Body
> = async (req, res, next) => {
	const { id } = req.params
	if (!id) {
		return res.status(400).json({ message: ERROR_MESSAGES.CARD_ID_REQUIRED })
	}

	try {
		const card = UpdateCardSchema.parse({
			...req.body,
			id
		})
		const { rows } = await updateCardById(card)

		if (rows.length === 0) {
			return res.status(404).json({ message: ERROR_MESSAGES.CARD_NOT_FOUND })
		}

		res.status(200).json({ data: rows })
	} catch (error) {
		next(error)
	}
}
