import { Router } from 'express'
import {
	handleCreateDeck,
	handleGetDecks,
	handleGetReviewsCount
} from './controller.ts'

const router = Router()

router.get('/', handleGetDecks)
router.post('/', handleCreateDeck)
router.post('/:id/reviews-count', handleGetReviewsCount)

export default router
