import type { NextFunction, Request, Response } from 'express'
import { pool } from '#src/config/db.ts'
import { CreateDeckSchema } from './deck.validator.ts'

export const createDeck = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name } = CreateDeckSchema.parse(req.body)

		await pool.query('INSERT INTO decks(name) VALUES($1)', [name])
		res.status(201).json({ message: 'Deck created successfully' })
	} catch (error) {
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
