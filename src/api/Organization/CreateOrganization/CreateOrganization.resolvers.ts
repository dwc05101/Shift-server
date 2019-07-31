import Organization from "../../../entities/Organization"
import {
  CreateOrganizationMutationArgs,
  CreateOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
  Mutation: {
    CreateOrganization: async (
      _,
      args: CreateOrganizationMutationArgs,
      { req }
    ): Promise<CreateOrganizationResponse> => {
      try {
        await Organization.create({
          ...args
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
  }
}

export default resolvers
