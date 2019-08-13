import Organization from "../../../entities/Organization"
import TimeTable from "../../../entities/TimeTable"
import {
  GetCurrentTimeTableQueryArgs,
  GetCurrentTimeTableResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Query: {
    GetCurrentTimeTable: async (
      _,
      args: GetCurrentTimeTableQueryArgs,
      { req }
    ): Promise<GetCurrentTimeTableResponse> => {
      const user: Organization = req.user
      try {
        const timetable = args.timetableId
          ? await TimeTable.findOne(
              {
                organizationId: args.organizationId
                  ? args.organizationId
                  : user.id,
                id: args.timetableId
              },
              {
                relations: [
                  "days",
                  "days.slots",
                  "days.slots.user",
                  "links",
                  "organization",
                  "organization.users"
                ]
              }
            )
          : await TimeTable.findOne(
              {
                organizationId: args.organizationId
                  ? args.organizationId
                  : user.id,
                yearMonthWeek: args.yearMonthWeek!
              },
              {
                relations: [
                  "days",
                  "days.slots",
                  "days.slots.user",
                  "links",
                  "organization",
                  "organization.users"
                ]
              }
            )
        if (timetable) {
          return {
            ok: true,
            error: null,
            timetable
          }
        } else {
          return {
            ok: false,
            error: "Timetable not found",
            timetable: null
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          timetable: null
        }
      }
    }
  }
}

export default resolvers
