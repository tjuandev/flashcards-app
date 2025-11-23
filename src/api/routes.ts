import { Router } from 'express'
import cardRouter from './card/card.router.ts'
import deckRouter from './deck/deck.router.ts'

const router = Router()

router.use('/deck', deckRouter)
router.use('/card', cardRouter)

export default router
