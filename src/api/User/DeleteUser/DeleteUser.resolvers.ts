import User from "../../../entities/User"
import { DeleteUserResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    DeleteUser: authResolver(
      async (_, __, { req }): Promise<DeleteUserResponse> => {
        const user: User = req.user
        user.remove()
        return {
          ok: true,
          error: null
        }
      }
    )
  }
}

export default resolvers
