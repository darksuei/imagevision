import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Users } from './src/entities/Users'

export const AppDataSource = new DataSource({
    "type": "mongodb",
    "url": 'mongodb+srv://Suei:Rrxgio43@cluster0.ryvunza.mongodb.net/imagevision',
    "entities": [Users,]
})