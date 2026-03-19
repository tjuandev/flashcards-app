This project uses `node-pg-migrate` for migrations.

## Commands:

To create a new migration file:
```bash
pnpm migrate:create <migration-name> --migration-file-language sql
```

To run the migrations:
```bash
pnpm migrate:up
```

To rollback the migrations:
```bash
pnpm migrate:down
```

To redo the last migration:
```bash
pnpm migrate:redo
```

