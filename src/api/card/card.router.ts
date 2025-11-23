import { Router } from 'express'
import { createCard, getDecks } from './card.controller.ts'

const router = Router()

router.get('/', getDecks)
router.post('/', createCard)

export default router
