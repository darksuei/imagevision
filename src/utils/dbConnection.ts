import { AppDataSource } from "../../typeormconfig";

export const databaseConnection = async (Users: any) => {

    const connection = await AppDataSource.initialize()

    console.log('DB connection running')

    return connection.getRepository(Users);
}