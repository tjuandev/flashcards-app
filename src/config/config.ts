import dotenv from 'dotenv'
dotenv.config()

const config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || 'development',
	db: {
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: Number.parseInt(process.env.DB_PORT || '5432')
	}
}

export default config
