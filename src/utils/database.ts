import { AppDataSource } from "../../ORMconfig";

export const databaseConnection = async (Users: any) => {

    const connection = await AppDataSource.initialize()

    console.log('Successfully connected to the database.')

    return connection.getRepository(Users);
}