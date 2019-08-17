import { ConnectionOptions } from "typeorm"

const defualtConnectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME || "shift",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

export default defualtConnectionOptions
