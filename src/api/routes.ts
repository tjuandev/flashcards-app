import { Router } from 'express'
import cardRouter from './card/router.ts'
import deckRouter from './deck/router.ts'

const router = Router()

router.use('/decks', deckRouter)
router.use('/cards', cardRouter)

export default router
