import dotenv from "dotenv"
dotenv.config()

import { Options } from "graphql-yoga"
import { createConnection } from "typeorm"
import app from "./app"
import defualtConnectionOptions from "./ormConfig"

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = (): void => {
  console.log(`Listening on Port ${PORT}`)
}

createConnection(defualtConnectionOptions).then(() => {
  app.start(appOptions, handleAppStart)
})
