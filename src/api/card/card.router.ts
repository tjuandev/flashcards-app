import { Router } from 'express'
import {
	handleCreateCardByDeckId,
	handleDeleteCard,
	handleGetCardsByDeckId,
	handleUpdateCard
} from './card.controller.ts'

const router = Router()

router.get('/:deckId', handleGetCardsByDeckId)
router.post('/:deckId', handleCreateCardByDeckId)
router.delete('/:id', handleDeleteCard)
router.put('/:id', handleUpdateCard)

export default router
