import User from "../../../entities/User"
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args
      try {
        const existingUser = await User.findOne({ fbId })
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: createJWT(existingUser.id)
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save()
        return {
          ok: true,
          error: null,
          token: createJWT(newUser.id)
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers
