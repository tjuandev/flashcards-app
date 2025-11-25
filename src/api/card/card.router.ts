import { Router } from 'express'
import {
	handleCreateCardByDeckId,
	handleGetCardsByDeckId
} from './card.controller.ts'

const router = Router()

router.get('/:deckId', handleGetCardsByDeckId)
router.post('/:deckId', handleCreateCardByDeckId)

export default router
