import Organization from "../../../entities/Organization"
import User from "../../../entities/User"
import {
  CreateUserToOrganizationMutationArgs,
  CreateUserToOrganizationResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import authResolver from "../../../utils/authMiddleware"

const resolvers: Resolvers = {
  Mutation: {
    CreateUserToOrganization: authResolver(
      async (
        _,
        args: CreateUserToOrganizationMutationArgs,
        { req }
      ): Promise<CreateUserToOrganizationResponse> => {
        const user: Organization = req.user
        try {
          const existingUser = await User.findOne({
            personalCode: args.personalCode,
            organizationId: user.id
          })
          if (!existingUser) {
            await User.create({
              ...args,
              organization: user
            }).save()
            return {
              ok: true,
              error: null
            }
          } else {
            return {
              ok: false,
              error: "User with given code already exists"
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
