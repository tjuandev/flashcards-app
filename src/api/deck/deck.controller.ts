import type { NextFunction, Request, Response } from 'express'
import { pool } from '#src/config/db.ts'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './deck.constants.ts'
import { CreateDeckSchema } from './deck.validator.ts'

export const createDeck = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name } = CreateDeckSchema.parse(req.body)
		await pool.query('INSERT INTO decks(name) VALUES($1)', [name])
		res.status(201).json({ message: SUCCESS_MESSAGES.DECK_CREATION_SUCCESS })
	} catch (error) {
		res.status(400).json({ message: ERROR_MESSAGES.DECK_CREATION_FAILED })
		next(error)
	}
}

export const getDecks = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { rows } = await pool.query('SELECT * FROM decks')
		res.json(rows).status(200)
	} catch (error) {
		next(error)
	}
}
