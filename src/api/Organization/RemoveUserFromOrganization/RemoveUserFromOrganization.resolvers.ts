import { createQueryBuilder } from "typeorm"
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
        const adminUser: User = req.user
        try {
          const organization = await Organization.findOne(
            { id: args.organizationId },
            { relations: ["users"] }
          )
          const targetUser = await User.findOne({ id: args.userId })
          if (organization && targetUser) {
            if (organization.adminId === adminUser.id) {
              if (organization.users.find(user => user.id === targetUser.id)) {
                await createQueryBuilder()
                  .relation(Organization, "users")
                  .of(organization)
                  .remove(targetUser)
                return {
                  ok: true,
                  error: null
                }
              } else {
                return {
                  ok: false,
                  error: "User is not included in organization"
                }
              }
            } else {
              return {
                ok: false,
                error: "Only admin can remove users"
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
