import type { NextFunction, Request, Response } from 'express'
import { type Deck, decks } from './deck.model.ts'
import { CreateDeckSchema } from './deck.validator.ts'

export const createDeck = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = CreateDeckSchema.parse(req.body)
		const newDeck: Deck = { id: Date.now(), name }
		decks.push(newDeck)
		res.status(201).json(newDeck)
	} catch (error) {
		next(error)
	}
}

export const getDecks = (_req: Request, res: Response, next: NextFunction) => {
	try {
		res.json(decks)
	} catch (error) {
		next(error)
	}
}
