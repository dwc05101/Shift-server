import Organization from "../../../entities/Organization"
import {
  OrganizationSignInMutationArgs,
  OrganizationSignInResponse
} from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers"
import createJWT from "../../../utils/createJWT"

const resolvers: Resolvers = {
  Mutation: {
    OrganizationSignIn: async (
      _,
      args: OrganizationSignInMutationArgs
    ): Promise<OrganizationSignInResponse> => {
      try {
        const organization = await Organization.findOne({
          loginId: args.loginId
        })
        if (organization) {
          const isLoginSuccess = await organization.comparePassword(
            args.password
          )
          if (isLoginSuccess) {
            return {
              ok: true,
              error: null,
              token: createJWT(organization.id)
            }
          }
          return {
            ok: false,
            error: "아이디와 비밀번호를 확인해주세요.",
            token: null
          }
        } else {
          return {
            ok: false,
            error: "아이디와 비밀번호를 확인해주세요.",
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
