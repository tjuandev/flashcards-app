import { Router } from 'express'
import { createDeck, getDecks } from './deck.controller.ts'

const router = Router()

router.get('/', getDecks)
router.post('/', createDeck)

export default router
