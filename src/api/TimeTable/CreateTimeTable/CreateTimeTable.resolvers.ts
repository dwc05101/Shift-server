import Organization from "../../../entities/Organization"
import TimeTable from "../../../entities/TimeTable"
import User from "../../../entities/User"
import {
  CreateTimeTableMutationArgs,
  CreateTimeTableResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateTimeTable: authResolver(
      async (
        _,
        args: CreateTimeTableMutationArgs,
        { req }
      ): Promise<CreateTimeTableResponse> => {
        const user: User = req.user
        const { yearMonth, organizationId } = args
        try {
          const organization = await Organization.findOne(
            {
              id: organizationId
            },
            { relations: ["admin"] }
          )
          if (organization) {
            if (organization.admin.id === user.id) {
              await TimeTable.create({ yearMonth, organization }).save()
              return {
                ok: true,
                error: null
              }
            } else {
              return {
                ok: false,
                error: "Only admin can make a timatable"
              }
            }
          } else {
            return {
              ok: false,
              error: "Organization not found"
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
