# Create Router

Create a new API router module under `src/api/$ARGUMENTS/` following the project conventions.

## File structure to create

```
src/api/<name>/
  constants.ts
  types.ts
  validator.ts
  repository.ts
  controller.ts
  router.ts
  __tests__/<name>.test.ts
```

Also register the new router in `src/api/routes.ts`.

---

## Conventions

### `constants.ts`
Export two objects: `ERROR_MESSAGES` and `SUCCESS_MESSAGES`. Keys are SCREAMING_SNAKE_CASE describing the resource. Example:

```ts
export const ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: 'Resource not found',
  RESOURCE_CREATION_FAILED: 'Resource creation failed',
}

export const SUCCESS_MESSAGES = {
  RESOURCE_DELETION_SUCCESS: 'Resource deleted successfully',
}
```

### `validator.ts`
Define a base Zod schema for the resource, then derive operation-specific schemas using `.pick()` and `.extend()`. Example:

```ts
import z from 'zod'

export const ResourceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.string().datetime().optional(),
})

export const CreateResourceSchema = ResourceSchema.pick({ name: true })

export const UpdateResourceSchema = ResourceSchema.pick({ id: true, name: true }).extend({
  name: z.string().optional(),
})
```

### `types.ts`
Infer types from Zod schemas. Use namespaces for operation-scoped types. Param types are plain type aliases. Example:

```ts
import type z from 'zod'
import type { ResourceSchema, CreateResourceSchema, UpdateResourceSchema } from './validator.ts'

export type Resource = z.infer<typeof ResourceSchema>
export type ResourceIdParam = { id: string }

export namespace CreateResource {
  export type Body = z.infer<typeof CreateResourceSchema>
}

export namespace UpdateResource {
  export type Body = z.infer<typeof UpdateResourceSchema>
}
```

### `repository.ts`
Import `pool` from `#src/config/db.ts`. Each function runs a parameterized SQL query (`$1`, `$2`, ...). Type the query result with `pool.query<Type>(...)`. Example:

```ts
import { pool } from '#src/config/db.ts'
import type { Resource, ResourceIdParam, CreateResource, UpdateResource } from './types.ts'

export async function createResource(data: CreateResource.Body) {
  return await pool.query<Resource>(
    'INSERT INTO resources(name) VALUES($1) RETURNING *',
    [data.name]
  )
}

export async function findResourceById(id: ResourceIdParam['id']) {
  return await pool.query<Resource>('SELECT * FROM resources WHERE id = $1', [id])
}

export async function deleteResourceById(id: ResourceIdParam['id']) {
  return await pool.query<never>('DELETE FROM resources WHERE id = $1', [id])
}

export async function updateResourceById(data: UpdateResource.Body) {
  return await pool.query<Resource>(
    `UPDATE resources SET name = COALESCE($1, name) WHERE id = $2 RETURNING *`,
    [data.name ?? null, data.id]
  )
}
```

 If a migration is needed, create a new migration file with the `/create-migration` skill.

### `controller.ts`
Each handler is typed as `RequestHandler<Params, ResponseBody, RequestBody>` using `DefaultResponse` from `#src/types/api/response.ts`. All controller functions **must** be prefixed with `handle` (e.g. `handleCreateResource`, `handleGetResourceById`) to distinguish them from repository functions that share similar names. Parse request bodies with Zod schemas. Pass errors to `next(error)`. Return 404 when an update/find returns empty rows. Example:

```ts
import type { RequestHandler } from 'express'
import type { DefaultResponse } from '#src/types/api/response.ts'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants.ts'
import { createResource, deleteResourceById, findResourceById, updateResourceById } from './repository.ts'
import type { ResourceIdParam, CreateResource, UpdateResource } from './types.ts'
import { CreateResourceSchema, UpdateResourceSchema } from './validator.ts'

export const handleCreateResource: RequestHandler<never, DefaultResponse, CreateResource.Body> = async (req, res, next) => {
  try {
    const data = CreateResourceSchema.parse(req.body)
    const { rows } = await createResource(data)
    return res.status(201).json({ data: rows })
  } catch (error) {
    next(error)
  }
}

export const handleGetResourceById: RequestHandler<ResourceIdParam, DefaultResponse> = async (req, res, next) => {
  try {
    const { rows } = await findResourceById(req.params.id)
    res.status(200).json({ data: rows })
  } catch (error) {
    next(error)
  }
}

export const handleDeleteResource: RequestHandler<ResourceIdParam, DefaultResponse> = async (req, res, next) => {
  try {
    await deleteResourceById(req.params.id)
    res.status(200).json({ message: SUCCESS_MESSAGES.RESOURCE_DELETION_SUCCESS })
  } catch (error) {
    next(error)
  }
}

export const handleUpdateResource: RequestHandler<ResourceIdParam, DefaultResponse, UpdateResource.Body> = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = UpdateResourceSchema.parse({ ...req.body, id })
    const { rows } = await updateResourceById(data)

    if (rows.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND })
    }

    res.status(200).json({ data: rows })
  } catch (error) {
    next(error)
  }
}
```

### `router.ts`
Create an Express `Router`, register handlers, and default export it. Example:

```ts
import { Router } from 'express'
import { handleCreateResource, handleDeleteResource, handleGetResourceById, handleUpdateResource } from './controller.ts'

const router = Router()

router.get('/:id', handleGetResourceById)
router.post('/', handleCreateResource)
router.delete('/:id', handleDeleteResource)
router.put('/:id', handleUpdateResource)

export default router
```

### `src/api/routes.ts`
Import the new router and register it with `router.use('/resources', resourceRouter)`.

---

## Unit tests (`__tests__/<name>.test.ts`)

Mock the repository module with `vi.mock('../repository.ts', ...)` so no real DB calls are made. Use `vi.hoisted` for shared fixture data. Import the supertest helper from `#src/helpers/test/request.ts`. Call `vi.clearAllMocks()` in `beforeEach`. Assert on response status, response body shape, and that the correct repository function was called with the right arguments. Example structure:

```ts
import request from '#src/helpers/test/request.ts'
import * as resourceModel from '../repository.ts'

const RESOURCE_LIST = vi.hoisted(() => [
  { id: 'some-uuid', name: 'Resource 1' },
])

vi.mock('../repository.ts', () => ({
  findResourceById: vi.fn().mockResolvedValue({ rows: RESOURCE_LIST }),
  createResource: vi.fn().mockResolvedValue({ rows: [RESOURCE_LIST[0]] }),
}))

describe('Route: /resources', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return a resource by id', async () => {
    const response = await request.get('/resources/some-uuid')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ data: RESOURCE_LIST })
    expect(resourceModel.findResourceById).toHaveBeenCalledWith('some-uuid')
  })
})
```

> For deeper test patterns and edge cases, use the `/create-unit-test` skill.
