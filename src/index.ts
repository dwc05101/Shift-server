import dotenv from "dotenv"
dotenv.config()

import { Options } from "graphql-yoga"
import { createConnection } from "typeorm"
import app from "./app"
import defualtConnectionOptions from "./ormConfig"
import decodeJWT from "./utils/decodeJWT"

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"
const SUBSCRIPTION_ENDPONT: string = "/subscription"

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPONT,
    onConnect: async connectionParams => {
      const token = connectionParams["X-JWT"]
      if (token) {
        const user = await decodeJWT(token)
        if (user) {
          return {
            currentUser: user
          }
        }
      }

      throw new Error("NO JWT")
    }
  }
}

const handleAppStart = (): void => {
  console.log(`Listening on Port ${PORT}`)
}

createConnection(defualtConnectionOptions).then(() => {
  app.start(appOptions, handleAppStart)
})
