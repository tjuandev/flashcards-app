import type { RequestHandler } from 'express'
import type { DefaultResponse } from '#src/types/api/response.ts'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants.ts'
import {
	createCardByDeckId,
	deleteCardById,
	findCardsByDeckId,
	getReviewsCountByDeckId,
	updateCardById
} from './repository.ts'
import type {
	CardIdParam,
	CreateCard,
	DeckIdParam,
	UpdateCard
} from './types.ts'
import { CreateCardSchema, UpdateCardSchema } from './validator.ts'

export const handleCreateCardByDeckId: RequestHandler<
	never,
	DefaultResponse,
	CreateCard.Body
> = async (req, res, next) => {
	try {
		const card = CreateCardSchema.parse(req.body)
		const { rows } = await createCardByDeckId(card)

		return res.status(201).json({ data: rows })
	} catch (error) {
		next(error)
	}
}

export const handleGetCardsByDeckId: RequestHandler<
	DeckIdParam,
	DefaultResponse
> = async (req, res, next) => {
	try {
		const { rows } = await findCardsByDeckId(req.params.deck_id)
		res.status(200).json({ data: rows })
	} catch (error) {
		next(error)
	}
}

export const handleGetReviewsCountByDeckId: RequestHandler<
	DeckIdParam,
	DefaultResponse
> = async (req, res, next) => {
	try {
		const { rows } = await getReviewsCountByDeckId(req.params.deck_id)
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
	try {
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
