import { Router } from 'express'
import {
	handleCreateCardByDeckId,
	handleDeleteCard,
	handleGetCardsByDeckId,
	handleGetReviewsCountByDeckId,
	handleUpdateCard
} from './controller.ts'

const router = Router()

router.get('/:deck_id', handleGetCardsByDeckId)
router.post('/', handleCreateCardByDeckId)
router.delete('/:id', handleDeleteCard)
router.put('/:id', handleUpdateCard)

// NOTE -> Reviews
router.get('/reviews-count/:deck_id', handleGetReviewsCountByDeckId)

export default router
