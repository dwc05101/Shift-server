import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  CreateOrganizationMutationArgs,
  CreateOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateOrganization: authResolver(
      async (
        _,
        args: CreateOrganizationMutationArgs,
        { req }
      ): Promise<CreateOrganizationResponse> => {
        const user: User = req.user
        try {
          await Organization.create({
            ...args,
            admin: user
          }).save()
          return {
            ok: true,
            error: null
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
