import { pool } from '#src/config/db.ts'

export const mockPoolQuery = (resolvedValue: any) => {
	vi.mocked(pool.query).mockResolvedValue({
		rows: resolvedValue
	} as any)
}
