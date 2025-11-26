import { Router } from 'express'
import {
	handleCreateCardByDeckId,
	handleDeleteCard,
	handleGetCardsByDeckId
} from './card.controller.ts'

const router = Router()

router.get('/:deckId', handleGetCardsByDeckId)
router.post('/:deckId', handleCreateCardByDeckId)
router.delete('/:cardId', handleDeleteCard)

export default router
