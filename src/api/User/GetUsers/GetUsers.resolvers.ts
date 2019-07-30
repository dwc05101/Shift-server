import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import { GetUsersQueryArgs, GetUsersResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetUsers: authResolver(
      async (
        _,
        args: GetUsersQueryArgs,
        { req }
      ): Promise<GetUsersResponse> => {
        const user: User = req.user
        try {
          const organization = await Organization.findOne(
            { id: args.organizationId },
            { relations: ["users"] }
          )
          if (organization) {
            if (organization.adminId === user.id) {
              return {
                ok: true,
                error: null,
                users: organization.users
              }
            } else {
              return {
                ok: false,
                error: "Only admin can get users",
                users: null
              }
            }
          } else {
            return {
              ok: false,
              error: "Organization not found",
              users: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            users: null
          }
        }
      }
    )
  }
}

export default resolvers
