import { Router } from 'express'
import { handleCreateDeck, handleGetDecks } from './controller.ts'

const router = Router()

router.get('/', handleGetDecks)
router.post('/', handleCreateDeck)

export default router
