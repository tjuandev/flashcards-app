import { Router } from 'express'
import cardRouter from './card/card.router.ts'
import deckRouter from './deck/deck.router.ts'

const router = Router()

router.use('/decks', deckRouter)
router.use('/cards', cardRouter)

export default router
