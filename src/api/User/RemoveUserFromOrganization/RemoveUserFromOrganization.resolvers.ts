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
          let success = true
          await args.users.forEach(async userId => {
            const targetUser = await User.findOne({
              id: userId,
              organizationId: user.id
            })
            if (targetUser) {
              await targetUser.remove()
            } else {
              success = false
            }
          })

          if (success) {
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "존재하지 않는 유저가 포함되어 있습니다."
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
