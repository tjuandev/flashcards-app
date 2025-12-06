import { Router } from 'express'
import {
	handleCreateCardByDeckId,
	handleDeleteCard,
	handleGetCardsByDeckId,
	handleUpdateCard
} from './controller.ts'

const router = Router()

router.get('/:deck_id', handleGetCardsByDeckId)
router.post('/', handleCreateCardByDeckId)
router.delete('/:id', handleDeleteCard)
router.put('/:id', handleUpdateCard)

export default router
