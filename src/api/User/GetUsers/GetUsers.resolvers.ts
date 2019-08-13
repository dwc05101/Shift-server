import Organization from "../../../entities/Organization"
import { GetUsersResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetUsers: authResolver(
      async (_, __, { req }): Promise<GetUsersResponse> => {
        const user: Organization = req.user
        try {
          const organization = await Organization.findOne(
            { id: user.id },
            {
              relations: [
                "users",
                "users.slots",
                "users.slots.day",
                "users.slots.day.timetable"
              ]
            }
          )
          if (organization) {
            return {
              ok: true,
              error: null,
              users: organization.users
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
