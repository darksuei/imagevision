import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Users } from './src/entities/Users'

config();

export const AppDataSource = new DataSource({
    "type": "mongodb",
    "url": process.env.DB_URI,
    "entities": [Users,]
})