import { GetMyProfileResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: authResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req
        return {
          ok: true,
          error: null,
          user
        }
      }
    )
  }
}

export default resolvers
