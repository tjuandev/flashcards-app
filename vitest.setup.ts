import { vi } from 'vitest'

vi.mock('pg', () => ({
	Pool: vi.fn(() => ({
		query: vi.fn(),
		on: vi.fn()
	}))
}))
