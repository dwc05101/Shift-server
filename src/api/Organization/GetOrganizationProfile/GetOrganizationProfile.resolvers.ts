import Organization from "../../../entities/Organization"
import { GetOrganizationProfileResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Query: {
    GetOrganizationProfile: authResolver(
      async (_, args, { req }): Promise<GetOrganizationProfileResponse> => {
        try {
          const organization = await Organization.findOne(
            { id: req.user.id },
            { relations: ["users"] }
          )
          if (organization) {
            return {
              ok: true,
              error: null,
              organization
            }
          } else {
            return {
              ok: false,
              error: "Organization Not found",
              organization: null
            }
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            organization: null
          }
        }
      }
    )
  }
}

export default resolvers
