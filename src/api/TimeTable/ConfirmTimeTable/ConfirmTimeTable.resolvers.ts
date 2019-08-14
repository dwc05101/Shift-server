import Organization from "../../../entities/Organization"
import TimeTable from "../../../entities/TimeTable"
import {
  ConfirmTimeTableMutationArgs,
  ConfirmTimeTableResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    ConfirmTimeTable: authResolver(
      async (
        _,
        args: ConfirmTimeTableMutationArgs,
        { req }
      ): Promise<ConfirmTimeTableResponse> => {
        const user: Organization = req.user
        try {
          const timetable = await TimeTable.findOne({ id: args.timetableId })
          if (timetable) {
            if (timetable.organizationId === user.id) {
              timetable.isConfirmed = true
              timetable.save()
              return {
                ok: true,
                error: null
              }
            } else {
              return {
                ok: false,
                error: "Not Authorized"
              }
            }
          } else {
            return {
              ok: false,
              error: "Timetable not found"
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
