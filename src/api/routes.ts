import { Router } from 'express'
import deckRouter from './deck/deck.router.ts'

const router = Router()

router.use('/deck', deckRouter)

export default router
