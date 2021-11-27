import { createConnection } from "typeorm";
import Article from "./entities/Article";
import Feed from "./entities/Feed";
import Tag from "./entities/Tag";

interface DatabaseInformation {
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
}

function getDatabaseInformation(): DatabaseInformation {
  return {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
  }
}

export function setupDatabase() {
  const { host, port, username, password, database } = getDatabaseInformation();

  (async () => {
    try {
      await createConnection({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities: [
          // TODO: Get batch imports by directory to work
          Tag,
          Feed,
          Article,
        ],
        synchronize: true,
        logging: ['error', 'query']
      })
      console.log('Database connection created')
    } catch (e) {
      console.error('Error creating database connection: ', e)
    }
  })()
}
