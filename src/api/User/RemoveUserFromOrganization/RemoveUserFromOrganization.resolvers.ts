import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  RemoveUserFromOrganizationMutationArgs,
  RemoveUserFromOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    RemoveUserFromOrganization: authResolver(
      async (
        _,
        args: RemoveUserFromOrganizationMutationArgs,
        { req }
      ): Promise<RemoveUserFromOrganizationResponse> => {
        const user: Organization = req.user
        try {
          const targetUser = await User.findOne({ id: args.userId })
          if (targetUser) {
            if (targetUser.organizationId === user.id) {
              targetUser.remove()
              return {
                ok: true,
                error: null
              }
            } else {
              return {
                ok: false,
                error: "User is not in the organization"
              }
            }
          } else {
            return {
              ok: false,
              error: "Organization / User not found"
            }
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
