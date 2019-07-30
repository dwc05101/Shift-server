import Organization from "../../../entities/Organization"
import {
  GetTimeTablesQueryArgs,
  GetTimeTablesResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetTimeTables: authResolver(
      async (
        _,
        args: GetTimeTablesQueryArgs,
        { req }
      ): Promise<GetTimeTablesResponse> => {
        try {
          const organization = await Organization.findOne(
            { id: args.organizationId },
            { relations: ["timetables"] }
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
