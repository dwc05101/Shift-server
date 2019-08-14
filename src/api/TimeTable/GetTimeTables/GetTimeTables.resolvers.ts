import Organization from "../../../entities/Organization"
import { GetTimeTablesResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetTimeTables: authResolver(
      async (_, __, { req }): Promise<GetTimeTablesResponse> => {
        const user: Organization = req.user
        try {
          const organization = await Organization.findOne(
            { id: user.id },
            {
              relations: [
                "timetables",
                "timetables.links",
                "timetables.days",
                "timetables.days.slots",
                "timetables.days.slots.user"
              ]
            }
          )
          if (organization) {
            return {
              ok: true,
              error: null,
              timetables: organization.timetables
            }
          } else {
            return {
              ok: false,
              error: "Organization not found",
              timetables: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            timetables: null
          }
        }
      }
    )
  }
}

export default resolvers
