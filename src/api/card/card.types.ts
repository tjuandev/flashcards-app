import type z from 'zod'
import type { CardSchema } from './card.validator.ts'

export type CardModel = z.infer<typeof CardSchema>

export type CreateCardBody = Pick<CardModel, 'front' | 'back'>
