import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  UpdateUserMutationArgs,
  UpdateUserResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"
import cleanNullArgs from "../../../utils/cleanNullArgs"

const resolvers: Resolvers = {
  Mutation: {
    UpdateUser: authResolver(
      async (
        _,
        args: UpdateUserMutationArgs,
        { req }
      ): Promise<UpdateUserResponse> => {
        const user: Organization = req.user
        const notNullArgs: any = cleanNullArgs(args)
        delete notNullArgs.userId
        try {
          await User.update(
            { id: args.userId, organizationId: user.id },
            { ...notNullArgs }
          )
          return {
            ok: true,
            error: null
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message
          }
        }
      }
    )
  }
}

export default resolvers
