import type { AppError } from '#src/middlewares/errorHandler.ts'

// This is a optimized helper to throw an error that will be caught by the global error handler
// located in the middlewares/errorHandler.ts file
export const throwRequestError = (status: number, message: string) => {
	const error = new Error(message) as AppError
	error.status = status
	throw error
}
