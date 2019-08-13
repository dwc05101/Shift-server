import Organization from "../../../entities/Organization"
import {
  CreateOrganizationMutationArgs,
  CreateOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resolvers: Resolvers = {
  Mutation: {
    CreateOrganization: async (
      _,
      args: CreateOrganizationMutationArgs,
      { req }
    ): Promise<CreateOrganizationResponse> => {
      try {
        const existingOrganization = await Organization.findOne({
          loginId: args.loginId
        })
        if (!existingOrganization) {
          const organization = await Organization.create({
            ...args
          }).save()
          return {
            ok: true,
            error: null,
            token: createJWT(organization.id)
          }
        } else {
          return {
            ok: false,
            error: "아이디가 이미 사용중 입니다.",
            token: null
          }
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null
        }
      }
    }
  }
}

export default resolvers
