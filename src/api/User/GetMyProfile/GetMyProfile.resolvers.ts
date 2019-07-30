import User from "../../../entities/User"
import { GetMyProfileResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: authResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req
        const userInstance = await User.findOne(
          { id: user.id },
          {
            relations: [
              "organizationsAsAdmin",
              "organizationsAsUser",
              "invitations",
              "slots"
            ]
          }
        )
        if (userInstance) {
          return {
            ok: true,
            error: null,
            user: userInstance
          }
        } else {
          return {
            ok: false,
            error: "nof",
            user: null
          }
        }
      }
    )
  }
}

export default resolvers
