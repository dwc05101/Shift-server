import Organization from "../../../entities/Organization"
import { RemoveOrganizationResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    RemoveOrganization: authResolver(
      async (_, __, { req }): Promise<RemoveOrganizationResponse> => {
        const user: Organization = req.user
        try {
          await user.remove()
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
