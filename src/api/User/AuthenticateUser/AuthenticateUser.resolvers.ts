import User from "../../../entities/User"
import {
  AuthenticateUserMutationArgs,
  AuthenticateUserResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Mutation: {
    AuthenticateUser: async (
      _,
      args: AuthenticateUserMutationArgs
    ): Promise<AuthenticateUserResponse> => {
      try {
        const user = await User.findOne(
          {
            personalCode: args.personalCode,
            organizationId: args.organizationId
          },
          { relations: ["slots", "slots.day"] }
        )
        if (user) {
          return {
            ok: true,
            error: null,
            user
          }
        } else {
          return {
            ok: false,
            error: "존재하지 않는 유저입니다.",
            user: null
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          user: null
        }
      }
    }
  }
}

export default resolvers
